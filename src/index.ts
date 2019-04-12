import express from "express";
import bodyParser from "body-parser";
import { userRouter } from "./router/user-router";
import { sessionMiddleware } from "./middleware/sessionMiddleware";

const app = express();

app.use(bodyParser.json());

app.use(sessionMiddleware);

app.use('/user',userRouter);

app.listen(8080, () => {
    console.log('Application Started.');
});