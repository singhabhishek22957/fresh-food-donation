import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// generate AccessToken And Refresh Token 

const generateAccessRefreshToken = asyncHandler(async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const accessToken =  user.generateAccessToken();
  const refreshToken =  user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({
    validateBeforeSave: false,
  });
  if (!accessToken || !refreshToken) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
  return { accessToken, refreshToken };
});

// register user ;

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, phoneNumber, password, username } = req.body;

  // validate
  if (
    [name, email, phoneNumber, password, username].some(
      (value) => value?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // check if user already exist

  const userExist = await User.findOne({ username });

  if (userExist) {
    throw new ApiError(400, "User already exist");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;

  console.log("avatarLocalPath", avatarLocalPath);

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  const user = await User.create({
    name,
    email,
    avatarUrl: avatar?.url,
    username,
    password,
    phoneNumber,
  });

  const createUser = await User.findById(user._id).select(
    " -password -refreshToken"
  );

  if (!createUser) {
    throw new ApiError(500, "Something went wrong while creating user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createUser, "User created successfully"));
});

// login user

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, username, password } = req.body;
  console.log("Login erorrrr User Details: ", req.body);
  

  if (!password || (email?.trim() === "" && username?.trim() === "")) {
    throw new ApiError(400, "password, Email or username is required");
  }

  // check if user Exist

  const userExist = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!userExist) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordMatch = await userExist.comparePassword(password);

  if (!isPasswordMatch) {
    res.status(401).json(
      new ApiResponse(
        401,
        {
          message: "password is incorrect",
          statusCode: 400,
          success: false,
        },
        "Invalid Credentials"
      )
    );
  }
console.log("User Exist: ", userExist);

  const { accessToken, refreshToken } =  generateAccessRefreshToken(
    userExist._id
  );

  console.log("Access Token: ", accessToken);
  console.log("Refresh Token: ", refreshToken);
  

  const loggedInUser = await User.findById(userExist._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: false,
    samesite: "lax",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

// logout user

const logoutUser = asyncHandler(async (req, res, next) => {
  User.findOneAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", null, options)
    .cookie("refreshToken", null, options)
    .json(
      new ApiResponse(
        200,
        {
          message: "User logged out successfully",
          success: true,
          successCode: 200,
        },
        "User logged out successfully"
      )
    );
});

// get User details

const getUserDetails = asyncHandler(async (req, res, next) => {
  console.log("User Details:",req.user);

  if (!req.user) {
    return res.status(401).json(
      new ApiResponse(
        401,
        {
          message: "Unauthorized",
          success: false,
          successCode: 401,
        },
        "unauthorized user : access token not fund "
      )
    );
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: req.user,
      },
      "User details fetched successfully"
    )
  );
});

const testing = asyncHandler(async (req, res, next) => {
  return res.status(200).json({
    data:{
      name:"Testing",
      intention:"Check it is working or not if able to see on frontend, then its worked successfully"
    }
  })
  console.log("hello world");
});

export { testing, registerUser, loginUser, logoutUser, getUserDetails };
