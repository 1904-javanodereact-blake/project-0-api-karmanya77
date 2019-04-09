import express = require("express");
import { users } from "../objectFile";

export const userRouter = express.Router();

userRouter.post('/login',(req, res) => {
    const {username, password} = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if(user){
        req.session.user = user;
        res.end();
    } 
    else{
        res.sendStatus(401);
    }

});