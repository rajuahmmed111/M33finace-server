import { UserRole } from '@prisma/client';
import express from "express";
import { userController } from "./user.controller";
import auth from "../../Middleware/auth";
import { uploadFile } from "../../../Helpers/fileUpload";
import { parseBodyData } from "../../Middleware/parseBodyData";
import validateRequest from "../../Middleware/validateRequest";
import { UserValidation } from "./user.validation";

const router = express.Router();


// create admin
router.post(
  "/create-admin",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  uploadFile.profileImage,
  parseBodyData, // must come before validation
  validateRequest(UserValidation.createAdmin),
  userController.createAdmin
);



export const userRoute = router;
