import { Router } from "express";
import { signIn, signUp } from "../controllers/auth";

import { body } from "express-validator";

const router: Router = Router();

router.post(
  "/sign-up",
  [
    body("email").isEmail().withMessage("Please enter Valid E-mail"),
    body("password")
      .isLength({ min: 5 })
      .trim()
      .withMessage("Password should be atleast 5 character long"),
    body("name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Name should not be empty!"),
  ],
  signUp
);

router.post(
  "/sign-in",
  [
    body("email").isEmail().withMessage("Please enter Valid E-mail"),
    body("password")
      .isLength({ min: 5 })
      .trim()
      .withMessage("Password should be atleast 5 character long"),
  ],
  signIn
);

export default router;
