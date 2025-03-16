import { Router } from "express";
import { getUserDetails, loginUser, logoutUser, registerUser, testing } from "../controllers/user.controllers.js";
import isAuthenticated from "../middlewares/auth.middleware.js";


const router = Router();


router.route("/testing").post(testing)

// create user 

router.route("/register").post(registerUser);

// login user 

router.route("/login").post(loginUser);

// logout user

router.route("/logout").post( isAuthenticated,logoutUser)

// get user

router.route("/getUser").get( isAuthenticated,getUserDetails)








export default router ;