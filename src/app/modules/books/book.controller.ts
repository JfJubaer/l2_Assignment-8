import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { bookFilterableFields } from "./book.constants";
import { bookService } from "./book.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await bookService.insertIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'book created successfully',
        data: result
     
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, bookFilterableFields);
    const options = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder']);
    const result = await bookService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Students fetched successfully',
        meta: result.meta,
        data: result.data
    });

});

const getByCategoryIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const result = await bookService.getByCategoryIdFromDB(categoryId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'books by category fetched successfully',
        data: result
    });
});
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await bookService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'book fetched successfully',
        data: result
    });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await bookService.updateIntoDB(id, payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'book updated successfully',
        data: result
    });
});
const deleteIntoDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await bookService.deleteIntoDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'book deleted successfully',
        data: result
    });
});

export const bookController = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteIntoDB,
    getByCategoryIdFromDB
};