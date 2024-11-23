import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { orderService } from "./order.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const {userId} =(req as any).user;
    const result = await orderService.insertIntoDB(req.body,userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'order created successfully',
        data: result
    });
});
const insertIntoDB_OrderBooks = catchAsync(async (req: Request, res: Response) => {
    const result = await orderService.insertIntoDB_OrderBooks(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'ordered-books created successfully',
        data: result
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await orderService.getAllFromDB((req.user as any).role as string,(req.user as any).userId as string);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'orders fetched successfully',
        data: result
    });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await orderService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'order fetched successfully',
        data: result
    });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await orderService.updateIntoDB(id, payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'order updated successfully',
        data: result
    });
});

const deleteIntoDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await orderService.deleteIntoDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'order deleted successfully',
        data: result
    });
});

export const orderController = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteIntoDB,
    insertIntoDB_OrderBooks
};