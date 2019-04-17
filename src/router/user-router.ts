import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import * as userDao from "../daos/user.dao";

export const userRouter = express.Router();

userRouter.get('', [
    authMiddleware(['admin']),
    async (req, res) => {
        const users = await userDao.findAllUsers();
        res.json(users);
    }]);

userRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await userDao.findByUsernameAndPassword(username, password);
    if (user) {
        req.session.user = user;
        res.json(user);
    }
    else {
        res.sendStatus(400);
    }
});

userRouter.get('/:id', async (req, res) => {
    const id: number = +req.params.id;
    const user = await userDao.findUserById(id);
    console.log(user);
    res.json(user);
});

userRouter.patch('', [authMiddleware(['admin']),
async (req, res) => {
    const { body } = req;
    const user = body;
    console.log('request to update user', user);
    const result = await userDao.updateUserData(user);
    if (!user) {
        res.sendStatus(400);
    }
    else {
        res.json(result);
    }
}]);
