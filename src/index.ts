import express from "express";
import bodyParser from "body-parser";
import { userRouter } from "./router/user-router";
import { sessionMiddleware } from "./middleware/sessionMiddleware";

const app = express();

app.use((req,res,next) => {
    console.log(`Request made with URL : ${req.url} and Method : ${req.method}`);
    next();
});
app.use(bodyParser.json());

app.use(sessionMiddleware);

app.use('/user',userRouter);

app.listen(8082, () => {
    console.log('Application Started.');
});