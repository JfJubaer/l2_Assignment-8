import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { categoryService } from "./cat.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await categoryService.insertIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'category created successfully',
        data: result
     
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await categoryService.getAllFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'categories fetched successfully',
        data: result
    });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await categoryService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'category fetched successfully',
        data: result
    });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await categoryService.updateIntoDB(id, payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'category updated successfully',
        data: result
    });
});
const deleteIntoDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await categoryService.deleteIntoDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'category deleted successfully',
        data: result
    });
});

export const categoryController = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteIntoDB
};