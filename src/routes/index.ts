import { Router } from 'express';
import bookRoutes from '../modules/books/book.routes';
import borrowRoutes from '../modules/borrows/borrow.routes';


const router = Router();

router.use('/books', bookRoutes);
router.use('/borrow', borrowRoutes);

export default router;