import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { orderController } from './order.controller';

const router = express.Router();

router.get(
    '/',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.CUSTOMER),
    orderController.getAllFromDB
);
router.get(
    '/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    orderController.getByIdFromDB
);

router.post(
    '/create-order',
    auth(ENUM_USER_ROLE.CUSTOMER),
    orderController.insertIntoDB
);
router.post(
    '/create-order-book',
    auth(ENUM_USER_ROLE.CUSTOMER),
    orderController.insertIntoDB_OrderBooks
);


router.patch(
    '/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    orderController.updateIntoDB)

router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    orderController.deleteIntoDB)

export const orderRoutes = router;