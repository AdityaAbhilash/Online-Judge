import express from "express";
import { Register } from "../controller/userController.js";

const router = express.Router();
import { body } from "express-validator";

router.post(
  "/register",[
    (body("name").trim().notEmpty().withMessage("Nmae Should Not be Empty"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email should not be empty")
      .isEmail()
      .withMessage("Invalid Email !!!"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username should not be empty"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password Should not be empty")
      .isLength({ min: 5, max: 30 })
      .withMessage("Password length be 5 to 30"))
  ],
  Register
);

export { router as Router };
