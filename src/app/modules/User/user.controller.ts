import httpStatus from "http-status";
import catchAsync from "../../../Utils/catchAsync";
import { userService } from "./user.service";
import sendResponse from "../../../Utils/sendResponse";
import { Request, Response } from "express";
import { pick } from "../../../shared/pick";
import { filterField } from "./user.constant";
import { paginationField } from "../../../Interface/common";

// create admin
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createAdmin(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Admin created successfully",
    data: result,
  });
});




export const userController = {
  createAdmin,
};
