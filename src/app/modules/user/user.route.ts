import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { userController } from './user.controller';

const router = express.Router();

router.get(
    '/users',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    userController.getAllFromDB
);
router.get(
    '/users/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    userController.getByIdFromDB
);
router.post(
    '/signup',
    userController.insertIntoDB
);
router.post(
    '/signin',
    userController.loginUser
);

router.patch(
    '/users/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
   userController.updateIntoDB)

router.delete(
    '/users/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
   userController.deleteIntoDB)

export const userRoutes = router;