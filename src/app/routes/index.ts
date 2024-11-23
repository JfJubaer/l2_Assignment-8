import express from 'express';
import { bookRoutes } from '../modules/books/book.route';
import { categoryRoutes } from '../modules/category/cat.route';
import { orderRoutes } from '../modules/order/order.route';
import { userRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: userRoutes
  },
  {
    path: '/categories',
    route: categoryRoutes
  },
  {
    path: '/books',
    route: bookRoutes
  },
  {
    path: '/orders',
    route:orderRoutes
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
