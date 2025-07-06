"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import errorHandler from './middleware/errorHandeller';
// import router from './routes';
const app = (0, express_1.default)();
//middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// app.use(express.urlencoded({ extended: true }));
// router connect
// app.use('/api', router);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// error middleware
// app.use(errorHandler);
exports.default = app;
