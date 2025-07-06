import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
}

const ApiResponse = (res: Response, statusCode: number, message: string, data: any) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export default ApiResponse;