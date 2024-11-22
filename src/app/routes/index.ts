import express from 'express';
import { bookRoutes } from '../modules/book/book.route';
import { userRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes

  {
    path: '/books',
    route: bookRoutes
  },
  {
    path: '/auth',
    route: userRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
