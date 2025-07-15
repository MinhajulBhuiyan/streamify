import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {

} from "../controllers/user.controller.js";

const router = express.Router();



export default router;