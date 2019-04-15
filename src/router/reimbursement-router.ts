import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import * as reimbursementDao from "../daos/reimbursement.dao";

export const reimbursementRouter = express.Router();

reimbursementRouter.get('/status/:statusId', [
    authMiddleware(['admin']),
    async (req, res) => {
        const id : number = +req.params.statusId;
        const reimbursementData = await reimbursementDao.findReimbursementStatusById(id);
        res.json(reimbursementData);
    }
]);

reimbursementRouter.get('/author/userId/:userId',[
    (req, res, next) => {
        const id : number = +req.params.userId;
        console.log(req.session.user.userId);
        const role = req.session.user.role;
        console.log(role);
        if(id === req.session.user.userId){
            console.log('Accessed By User');
            next();
        }
        else if(role === 'admin' || 'finance manager'){
            console.log('Accessed by Admin or Finance Manager');
            next();
        }
        else {
            console.log('You are not authorized.');
            res.sendStatus(403);
        }
    },
    async (req,res) => {
        const id : number = +req.params.userId;
        const reimbursementData = await reimbursementDao.findReimbursementUserById(id);
        res.json(reimbursementData);
    }
]);

reimbursementRouter.post('',
    async (req, res) => {
        const submittedData = req.body;
        const data = await reimbursementDao.submitReimbursement(submittedData);
        if(data){
            res.json(data);
        }
        else {
            res.sendStatus(403);
        }
    }
);

