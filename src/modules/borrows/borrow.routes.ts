import { Router } from 'express';
import { BorrowController } from './borrow.controller';

const borrowRoutes = Router();

borrowRoutes.post('/', BorrowController.borrowBook);
borrowRoutes.get('/', BorrowController.getBorrowedSummary);

export default borrowRoutes;