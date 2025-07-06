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
exports.BorrowController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const book_model_1 = __importDefault(require("../books/book.model"));
const borrow_model_1 = __importDefault(require("./borrow.model"));
const apiResponse_1 = __importDefault(require("../../middleware/apiResponse"));
const borrowBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        // Validate inputs
        if (!mongoose_1.default.Types.ObjectId.isValid(book)) {
            return (0, apiResponse_1.default)(res, 400, 'Invalid book ID', null);
        }
        if (!quantity || quantity <= 0) {
            return (0, apiResponse_1.default)(res, 400, 'Quantity must be greater than 0', null);
        }
        const foundBook = yield book_model_1.default.findById(book);
        if (!foundBook) {
            return (0, apiResponse_1.default)(res, 404, 'Book not found', null);
        }
        if (foundBook.copies < quantity) {
            return (0, apiResponse_1.default)(res, 400, 'Not enough copies available', null);
        }
        // Update book availability
        const updatedCopies = foundBook.copies - quantity;
        const isAvailable = updatedCopies > 0;
        yield book_model_1.default.updateOne({ _id: book }, {
            $inc: { copies: -quantity },
            $set: { available: isAvailable }
        });
        // Create borrow record
        const borrow = yield borrow_model_1.default.create({ book, quantity, dueDate });
        return (0, apiResponse_1.default)(res, 201, 'Book borrowed successfully', borrow);
    }
    catch (error) {
        next(error);
    }
});
const getBorrowedSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.default.aggregate([
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
        return (0, apiResponse_1.default)(res, 200, "Borrowed books summary retrieved successfully", summary);
    }
    catch (error) {
        next(error);
    }
});
exports.BorrowController = { borrowBook, getBorrowedSummary };
