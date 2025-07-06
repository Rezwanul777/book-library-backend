import { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  let errorResponse: any = {
    name: err.name,
    message,
  };

  // Handle Mongoose ValidationError
  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    errorResponse = {
      name: err.name,
      message: 'Validation failed',
      errors: err.errors,
    };
  }

  // Handle CastError (e.g., invalid ObjectId)
  else if (err instanceof mongoose.Error.CastError) {
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

export default errorHandler;