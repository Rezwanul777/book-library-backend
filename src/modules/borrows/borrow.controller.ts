import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import Book from '../books/book.model';
import Borrow from './borrow.model';
import ApiResponse from '../../middleware/apiResponse';

const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { book, quantity, dueDate } = req.body;

    // Validate inputs
    if (!mongoose.Types.ObjectId.isValid(book)) {
      return ApiResponse(res, 400, 'Invalid book ID', null);
    }

    if (!quantity || quantity <= 0) {
      return ApiResponse(res, 400, 'Quantity must be greater than 0', null);
    }

    const foundBook = await Book.findById(book);
    if (!foundBook) {
      return ApiResponse(res, 404, 'Book not found', null);
    }

    if (foundBook.copies < quantity) {
      return ApiResponse(res, 400, 'Not enough copies available', null);
    }

    // Update book availability
 const updatedCopies = foundBook.copies - quantity;
const isAvailable = updatedCopies > 0;

await Book.updateOne(
  { _id: book },
  {
    $inc: { copies: -quantity },
    $set: { available: isAvailable }
  }
);

    // Create borrow record
    const borrow = await Borrow.create({ book, quantity, dueDate });

    return ApiResponse(res, 201, 'Book borrowed successfully', borrow);
  } catch (error) {
    next(error);
  }
};

const getBorrowedSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" }
        }
      },
      {
        $lookup: {
          from: "books", 
          localField: "_id",
          foreignField: "_id",
          as: "book"
        }
      },
      { $unwind: "$book" },
      {
        $project: {
          _id: 0,
          book: {
            title: "$book.title",
            isbn: "$book.isbn"
          },
          totalQuantity: 1
        }
      }
    ]);

    return ApiResponse(res, 200, "Borrowed books summary retrieved successfully", summary);
  } catch (error) {
    next(error);
  }
};


export const BorrowController = { borrowBook, getBorrowedSummary };
