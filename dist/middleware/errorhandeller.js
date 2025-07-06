"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandler = (err, req, res, next) => {
    // Default values
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong';
    let errorResponse = {
        name: err.name,
        message,
    };
    // Handle Mongoose ValidationError
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        statusCode = 400;
        errorResponse = {
            name: err.name,
            message: 'Validation failed',
            errors: err.errors,
        };
    }
    // Handle CastError (e.g., invalid ObjectId)
    else if (err instanceof mongoose_1.default.Error.CastError) {
        statusCode = 400;
        errorResponse = {
            name: err.name,
            message: `Invalid value for ${err.path}`,
            value: err.value,
        };
    }
    // Return response
    res.status(statusCode).json({
        message: errorResponse.message,
        success: false,
        error: errorResponse,
    });
};
exports.default = errorHandler;
