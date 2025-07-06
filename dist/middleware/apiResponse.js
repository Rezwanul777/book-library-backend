"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiResponse = (res, statusCode, message, data) => {
    res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};
exports.default = ApiResponse;
