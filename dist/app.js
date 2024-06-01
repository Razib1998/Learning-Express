"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
// Parser
app.use(express_1.default.json());
const userRouter = express_1.default.Router();
const courseRouter = express_1.default.Router();
app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);
userRouter.post("/create-user", (req, res) => {
    const user = req.body;
    console.log(user);
    res.json({
        success: true,
        message: "user Created Successfully",
        data: user,
    });
});
courseRouter.post("/create-course", (req, res) => {
    const course = req.body;
    console.log(course);
    res.json({
        success: true,
        message: "course Created Successfully",
        data: course,
    });
});
// Middleware
const logger = (req, res, next) => {
    console.log(req.url, req.method, req.hostname);
    next();
};
app.get("/", logger, (req, res, next) => {
    try {
        res.send("Hello World");
    }
    catch (error) {
        next(error);
        // console.log(err);
        // res.status(400).json({
        //   success: false,
        //   message: "Failed to load data",
        //});
    }
});
app.post("/", logger, (req, res) => {
    //   console.log(req.body);
    res.send("got Data");
});
// Route Not found error handling..
app.all("*", (req, res) => {
    res.status(400).json({
        success: false,
        message: "Route not defined",
    });
});
// Global error handler
app.use((error, req, res, next) => {
    console.log(error);
    if (error) {
        res.status(400).json({
            success: false,
            message: "Something went Wrong",
        });
    }
});
exports.default = app;
