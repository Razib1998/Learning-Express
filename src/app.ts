import express, { NextFunction, Request, Response } from "express";

const app = express();
const port = 3000;

// Parser

app.use(express.json());

const userRouter = express.Router();
const courseRouter = express.Router();

app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);

userRouter.post("/create-user", (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);
  res.json({
    success: true,
    message: "user Created Successfully",
    data: user,
  });
});

courseRouter.post("/create-course", (req: Request, res: Response) => {
  const course = req.body;
  console.log(course);
  res.json({
    success: true,
    message: "course Created Successfully",
    data: course,
  });
});

// Middleware

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url, req.method, req.hostname);
  next();
};

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello world !");
});

app.post("/", logger, (req: Request, res: Response) => {
  //   console.log(req.body);
  res.send("got Data");
});

export default app;
