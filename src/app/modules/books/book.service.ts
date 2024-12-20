import { Book, Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { bookSearchableFields } from "./book.constants";
import { IBookFilterRequest } from "./book.interface";

const insertIntoDB = async (data:Book): Promise<Book> => {
    const result = await prisma.book.create({
        data,
        include :{
          category : true
        }
    });
    return result;
};

const getAllFromDB = async ( filters: IBookFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
      andConditions.push({
          OR: bookSearchableFields.map((field) => ({
              [field]: {
                  contains: searchTerm,
                  mode: 'insensitive'
              }
          }))
      });
  }

  if (Object.keys(filterData).length > 0) {
      andConditions.push({
          AND: Object.keys(filterData).map((key) => ({
              [key]: {
                  equals: (filterData as any)[key]
              }
          }))
      });
  }

  const whereConditions: Prisma.BookWhereInput =
      andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
      where: whereConditions,
      skip,
      take: size,
      orderBy:
          options.sortBy && options.sortOrder
              ? { [options.sortBy]: options.sortOrder }
              : {
                  price: 'desc'
              }
  });
  const total = await prisma.book.count({
      where: whereConditions
  });

  return {
      meta: {
          total,
          page,
          limit : size
      },
      data: result
  };

  
};

const getByCategoryIdFromDB = async (id: string): Promise<Book[] | null> => {
  const result = await prisma.book.findMany({
      where: {
        categoryId: id
      },
  });
  return result;
};
const getByIdFromDB = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
      where: {
          id
      },
      
    
  });
  return result;
};

const updateIntoDB = async (id: string, payload: Partial<Book>): Promise<Book> => {
  const result = await prisma.book.update({
      where: {
          id
      },
      data: payload,
  });
  return result;
}

const deleteIntoDB = async (id: string): Promise<Book> => {
  const result = await prisma.book.delete({
      where: {
          id
      }
  });
  return result;
}

export const bookService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteIntoDB,
    getByCategoryIdFromDB
};