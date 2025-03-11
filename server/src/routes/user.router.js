import { Router } from "express";
import { testing } from "../controllers/user.controllers.js";


const router = Router();


router.route("/testing").post(testing)











export default router ;