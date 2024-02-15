import { Router } from "express";
import { generateOtp, verifyOtp } from "../controllers/index.js";

const OTPRouter = new Router();

OTPRouter.post("/:organizationname/sendotp", generateOtp);
OTPRouter.post("/:organizationname/verifyotp", verifyOtp);

export default OTPRouter;
