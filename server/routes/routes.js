import express from "express";
import { Register ,Login ,Auth} from "../controller/userController.js";

const router = express.Router();
import { body } from "express-validator";
import { VerifyUser } from "../middleware/VerifyUser.js";

router.post(
  "/register",
  [
    (body("name").trim().notEmpty().withMessage("Name Should Not be Empty"),
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
      .withMessage("Password length be 5 to 30")),
  ],
  Register // this was the registration controller
);

// for login

router.post(
  "/login",
  [(body("username")
      .trim()
      .notEmpty()
      .withMessage("Username should not be empty"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password Should not be empty")
      // .isLength({ min: 5, max: 30 })
      // .withMessage("Password length be 5 to 30")
    ),
  ],Login
);

//verify route

router.get("/verify",VerifyUser,Auth)




export { router as Router };

/* It does handle incoming POST requests (option 2), but more precisely, it defines what should happen when a POST request is made to the specified route (/register in this case).*/
