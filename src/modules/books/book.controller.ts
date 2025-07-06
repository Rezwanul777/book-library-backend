import { NextFunction, Request, Response } from 'express';
import Book from './book.model';
import ApiResponse from '../../middleware/apiResponse';


// Create Book
const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();

    ApiResponse(res, 201, 'Book created successfully', savedBook);
  } catch (error) {
    next(error); // handled by errorHandler
  }
};

// Get All Books
const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      filter,              // genre filter
      sortBy = 'createdAt', // default sort field
      sort = 'desc',        // order: asc or desc
      limit = '10'          // limit: default 10
    } = req.query;

    const query: any = {};
    if (filter) {
      query.genre = filter;
    }

    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 })
      .limit(Number(limit));

    ApiResponse(res, 200, 'Books retrieved successfully', books);
  } catch (error) {
    next(error);
  }
};

// Get Book by ID
const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      const error = new Error('Book not found');
      (error as any).statusCode = 404;
      error.name = 'NotFoundError';
      throw error;
    }

    ApiResponse(res, 200, 'Book retrieved successfully', book);
  } catch (error) {
    next(error);
  }
};
//UPDATE


const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.bookId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      const error = new Error('Book not found');
      (error as any).statusCode = 404;
      throw error;
    }

    await updatedBook.updateAvailability();

    ApiResponse(res, 200, 'Book updated successfully', updatedBook);
  } catch (error) {
    next(error);
  }
};

//Delete
const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.bookId);

    if (!deleted) {
      const error = new Error('Book not found');
      (error as any).statusCode = 404;
      throw error;
    }

    ApiResponse(res, 200, 'Book deleted successfully', null);
  } catch (error) {
    next(error);
  }
};






export const BookController = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
  
};