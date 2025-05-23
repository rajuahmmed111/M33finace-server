import httpStatus from "http-status";

import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { uploadFile } from "../../../Helpers/fileUpload";
import { IUploadedFile } from "../../../Interface/file";
import { Request } from "express";
import ApiError from "../../../Error/apiError";
import { Admin, UserRole } from "@prisma/client";

// create admin
const createAdmin = async (req: Request): Promise<Admin> => {
  const file = req.file as IUploadedFile;

  if (file) {
    const uploadToCloudinary = await uploadFile.uploadToCloudinary(file);
    req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  // use transaction to create user and admin data
  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: userData,
    });

    const admin = await tx.admin.create({
      data: req.body.admin,
    });

    return admin;
  });

  return result;
};

export const userService = {
  createAdmin,
};
