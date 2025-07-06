"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const book_model_1 = __importDefault(require("./book.model"));
const apiResponse_1 = __importDefault(require("../../middleware/apiResponse"));
// Create Book
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = new book_model_1.default(req.body);
        const savedBook = yield book.save();
        (0, apiResponse_1.default)(res, 201, 'Book created successfully', savedBook);
    }
    catch (error) {
        next(error); // handled by errorHandler
    }
});
// Get All Books
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, // genre filter
        sortBy = 'createdAt', // default sort field
        sort = 'desc', // order: asc or desc
        limit = '10' // limit: default 10
         } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const books = yield book_model_1.default.find(query)
            .sort({ [sortBy]: sort === 'asc' ? 1 : -1 })
            .limit(Number(limit));
        (0, apiResponse_1.default)(res, 200, 'Books retrieved successfully', books);
    }
    catch (error) {
        next(error);
    }
});
// Get Book by ID
const getBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.default.findById(req.params.bookId);
        if (!book) {
            const error = new Error('Book not found');
            error.statusCode = 404;
            error.name = 'NotFoundError';
            throw error;
        }
        (0, apiResponse_1.default)(res, 200, 'Book retrieved successfully', book);
    }
    catch (error) {
        next(error);
    }
});
//UPDATE
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedBook = yield book_model_1.default.findByIdAndUpdate(req.params.bookId, req.body, { new: true, runValidators: true });
        if (!updatedBook) {
            const error = new Error('Book not found');
            error.statusCode = 404;
            throw error;
        }
        yield updatedBook.updateAvailability();
        (0, apiResponse_1.default)(res, 200, 'Book updated successfully', updatedBook);
    }
    catch (error) {
        next(error);
    }
});
//Delete
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield book_model_1.default.findByIdAndDelete(req.params.bookId);
        if (!deleted) {
            const error = new Error('Book not found');
            error.statusCode = 404;
            throw error;
        }
        (0, apiResponse_1.default)(res, 200, 'Book deleted successfully', null);
    }
    catch (error) {
        next(error);
    }
});
exports.BookController = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
};
