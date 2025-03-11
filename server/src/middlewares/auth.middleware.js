import { User } from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";



const isAuthenticated = asyncHandler(async(req,resizeBy,next)=>{
   try {
     console.log("checking Token........");
     const {token}= req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1]?.trim();
 
     // check if the token is present
     if(!token){
         return resizeBy.status(401).json( new ApiResponse(
             401,{},"Unauthorized, Please login to continue"
         ));
     }
 
     // verify the token
     const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
     console.log("Token is Decoded");
 
 
     // Fetch User 
     const user = await User.findById(decodedToken._id).select("-password -refreshToken");
 
    if(!user){
      console.log("User not found");
      return res.status(404).json(new ApiResponse(404,{},"User not found")); 
    }
 
     // Attached User object to request
     req.user=user;
     next();
   } catch (error) {
    if(error.name === "TokenExpiredError"){
        return res.status(401).json(new ApiResponse(401,{},"Token Expired, Please login again"));

    }
    
   }

   console.error("Error in isAuthenticated middleware",error);

   return res.status(500).json(new ApiResponse(500,{},"Internal Server Error"));
   
    
})