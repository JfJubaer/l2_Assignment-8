import { User } from "@prisma/client";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import { ILoginUser } from "./user.interface";


const insertIntoDB = async (data:User): Promise<User> => {
    const result = await prisma.user.create({
        data
    });
    return result;
};

const loginUser = async (payload: ILoginUser) => {
    const { email, password } = payload;
    const isUserExist = await prisma.user.findUnique({
        where:{
               email: email ,    
               password: password  
          }
        
    })

    // console.log(isUserExist);
  
    if (!isUserExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist or incorrect password');
    }
  
    // //create access token 
  
    const { id: userId, role} = isUserExist;
  
    const accessToken = jwtHelpers.createToken(
      { userId, role },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string,
    );
    // console.log(accessToken)
  
    return accessToken
  };

const getAllFromDB = async (
): Promise<User[]> => {
   const result = await prisma.user.findMany();
    return  result
};

const getByIdFromDB = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
      where: {
          id
      }
  });
  return result;
};

const updateIntoDB = async (id: string, payload: Partial<User>): Promise<User> => {
  const result = await prisma.user.update({
      where: {
          id
      },
      data: payload,
  });
  return result;
}

const deleteIntoDB = async (id: string): Promise<User> => {
  const result = await prisma.user.delete({
      where: {
          id
      }
  });
  return result;
}


export const userService = {
    insertIntoDB,
    getAllFromDB,
    loginUser,
    getByIdFromDB,
    updateIntoDB,
    deleteIntoDB
};