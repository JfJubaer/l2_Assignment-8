import { Category } from "@prisma/client";
import prisma from "../../../shared/prisma";


const insertIntoDB = async (data:Category): Promise<Category> => {
    const result = await prisma.category.create({
        data,
        include : {
          books : true
        }
    });
    return result;
};

const getAllFromDB = async (
): Promise<Category[]> => {
   const result = await prisma.category.findMany({
    include : {
      books : true
    }
});
    return  result
};

const getByIdFromDB = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
      where: {
          id
      },
        include : {
          books : true
        }
    
  });
  return result;
};

const updateIntoDB = async (id: string, payload: Partial<Category>): Promise<Category> => {
  const result = await prisma.category.update({
      where: {
          id
      },
      data: payload,
  });
  return result;
}

const deleteIntoDB = async (id: string): Promise<Category> => {
  const result = await prisma.category.delete({
      where: {
          id
      }
  });
  return result;
}


export const categoryService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteIntoDB
};