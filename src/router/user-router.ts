import express from "express";
import { users } from "../objectFile";
import { authMiddleware } from "../middleware/auth.middleware";

export const userRouter = express.Router();

userRouter.get('', [authMiddleware(['admin']),
(req, res) => {
    console.log('Retrieving users');
    res.json(users);
}]);

userRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        req.session.user = user;
        res.end(); 
    }
    else {
        res.sendStatus(401);
    }

});

userRouter.get('/:id', (req,res) =>{
    const id : number = +req.params.id;    

    const user = users.find( user => user.userId === id);
    if(user){
        res.json(user);
    }
    else{
        res.sendStatus(404);
    }
});

userRouter.patch('',(req,res) => {
    
});
