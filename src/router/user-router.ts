import express from "express";
import { users } from "../objectFile";
import { authMiddleware } from "../middleware/auth.middleware";
import * as userDao from "../daos/user.dao";

export const userRouter = express.Router();

userRouter.get('',
async (req, res) => {
    const users = await userDao.findAllUsers();
    res.json(users);
});

userRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        req.session.user = user;
        res.json(user);
    }
    else {
        res.sendStatus(400);
    }

});

userRouter.get('/:id', async (req,res) =>{
    const id : number = +req.params.id;
    const user = await userDao.findUserById(id);  
    console.log(user);
    res.json(user);
});

userRouter.patch('',[authMiddleware(['admin'])],(req,res) => {
    const {body} = req;
    const user = users.find(u => u.userId === body.userId);
    const {} = body;
    if(!user){
        res.sendStatus(404);
    }
    else{
        for(const field in user){
            if(body[field] != undefined){
                user[field] = body[field];
            }
        }
        res.json(user);
    }
});
