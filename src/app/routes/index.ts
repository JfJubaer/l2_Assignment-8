import express from 'express';
import { bookRoutes } from '../modules/book/book.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes

  {
    path: '/books',
    route: bookRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
