import express from "express";
import UserController from "../controller/user.controller.js";

const router = express.Router();
const userController = new UserController();
router.post("/signup", userController.handleRegistration);
router.post("/signin", userController.handleLogin);
router.get("/users", userController.handleGetAllUsers);
export default router;
