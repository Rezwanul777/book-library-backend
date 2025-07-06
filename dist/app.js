"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const errorhandeller_1 = __importDefault(require("./middleware/errorhandeller"));
const app = (0, express_1.default)();
//middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'https://book-frontend-nu.vercel.app',
    credentials: true
}));
app.use(express_1.default.urlencoded({ extended: true }));
//router connect
app.use('/api', routes_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// error middleware
app.use(errorhandeller_1.default);
exports.default = app;
