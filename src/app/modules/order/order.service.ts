import { Order, OrderedBook } from "@prisma/client";
import prisma from "../../../shared/prisma";


const insertIntoDB = async (data: any,userId :any): Promise<Order> => {
  console.log(data.orderedBooks,userId)
    const result = await prisma.order.create({
      data: {
        userId: userId as string,
        orderedBooks: {
          create: data.orderedBooks.map((book : OrderedBook) => ({
            bookId: book.bookId,
            quantity: book.quantity,
          })),
        },
      },
      include : {
        orderedBooks : { select: {
          bookId: true,
          quantity: true,
        },}
      }
    
    });
    return result;
};
const insertIntoDB_OrderBooks = async (data:OrderedBook,): Promise<OrderedBook> => {
  console.log(data);
    const result = await prisma.orderedBook.create({
        data
    });
    return result;
};

const getAllFromDB = async (role : string,userId : string
): Promise<Order[]> => {
  
  let result: Order[] = [];

  console.log(role,userId)

  if (role === "admin"){
    result = await prisma.order.findMany({
    });
  }
  if (role === "customer"){
    result = await prisma.order.findMany({
      where :{
        userId
      }
    });
  }

  return  result
    
};

const getByIdFromDB = async (id: string): Promise<Order | null> => {
  const result = await prisma.order.findUnique({
      where: {
          id
      }
    
  });
  return result;
};

const updateIntoDB = async (id: string, payload: Partial<Order>): Promise<Order> => {
  const result = await prisma.order.update({
      where: {
          id
      },
      data: payload,
  });
  return result;
}

const deleteIntoDB = async (id: string): Promise<Order> => {
  const result = await prisma.order.delete({
      where: {
          id
      }
  });
  return result;
}


export const orderService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteIntoDB,
    insertIntoDB_OrderBooks
};