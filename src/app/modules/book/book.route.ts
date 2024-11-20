import express from 'express';
import { bookController } from './book.controller';

const router = express.Router();

router.get(
    '/',
    bookController.getAllFromDB
);
router.post(
    '/',
    bookController.insertIntoDB
);



export const bookRoutes = router;