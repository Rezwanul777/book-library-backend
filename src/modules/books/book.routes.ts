import { Router } from 'express';
import { BookController } from './book.controller';


const bookRoutes = Router();


bookRoutes.post('/', BookController.createBook);
bookRoutes.get('/', BookController.getAllBooks);
bookRoutes.get('/:bookId', BookController.getBookById);
bookRoutes.put('/:bookId', BookController.updateBook);
bookRoutes.delete('/:bookId', BookController.deleteBook);



export default bookRoutes;