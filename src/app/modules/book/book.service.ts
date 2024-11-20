import { Book } from "@prisma/client";
import prisma from "../../../shared/prisma";


const insertIntoDB = async (data: Book): Promise<Book> => {
    const result = await prisma.book.create({
        data
    });
    return result;
};

const getAllFromDB = async (
): Promise<Book[]> => {
   const result = await prisma.book.findMany();
    return  result
    
};




export const bookService = {
    insertIntoDB,
    getAllFromDB
};