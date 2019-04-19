import express from "express";
import bodyParser from "body-parser";
import { userRouter } from "./router/user-router";
import { reimbursementRouter } from "./router/reimbursement-router";
import { sessionMiddleware } from "./middleware/sessionMiddleware";

const app = express();

const port = process.env.SHIP_PORT || 8080;

app.use(bodyParser.json());

app.use(sessionMiddleware);

app.use('/user',userRouter);

app.use('/reimbursement',reimbursementRouter);

app.listen(port, () => {
    console.log('Application Started with port number : ',port);
});