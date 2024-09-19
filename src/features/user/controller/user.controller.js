import { ApplicationError } from "../../../middleware/applicationError.js";
import { addUser, confirmLogin, getAllUsers } from "../model/user.model.js";
import jwt from "jsonwebtoken";
export default class UserController {
  handleRegistration = (req, res, next) => {
    const { name, email, password } = req.body;
    try {
      const registration = addUser(name, email, password);
      if (registration.success == false) {
        throw new ApplicationError(registration.msg, 401);
      } else {
        res.status(201).json(registration);
      }
    } catch (err) {
      next(err);
    }
  };

  handleLogin = (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = confirmLogin(email, password);
      if (user) {
        const token = jwt.sign(
          { userId: user.id, userEmail: user.email },
          "dontshare",
          { expiresIn: "1h" }
        );
        res
          .status(200)
          .cookie("token", token, { maxAge: 90000, httpOnly: false })
          .json({ success: true, msg: "login successful", user: user });
      } else {
        throw new ApplicationError("invalid credentials", 400);
      }
    } catch (err) {
      next(err);
    }
  };

  handleGetAllUsers = (req, res, next) => {
    try {
      const allUsers = getAllUsers();
      res.status(200).json(allUsers);
    } catch (err) {
      next(err);
    }
  };
}
