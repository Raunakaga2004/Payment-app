const express = require("express");
const {account, user} = require("../db")
const { authmiddleware } = require("./middleware");
const { default: mongoose } = require("mongoose");

const router = new express.Router();

router.get("/balance", authmiddleware, async (req,res)=>{
    const userId = req.userId;
    const temp_account = await account.findOne({userId : userId});
    const balance = temp_account.balance.toFixed(2);
    res.json({
        balance :  '₹'+balance
    })
})

router.post("/transfer", authmiddleware, async (req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    const userId = req.userId;

    const {amount, to} = req.body;

    const fromUser = await account.findOne({userId : userId}).session(session);
    if(fromUser.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message : "Insuffucient Balance!!"
        })
    }

    const toUser = await account.findOne({userId : to}).session(session);
    if(!toUser){
        await session.abortTransaction();
        return res.status(400).json({
            message : "User Not Found!!"
        })
    }

    await account.updateOne({userId : userId}, {$inc : {balance : -amount}}).session(session);
    await account.updateOne({userId : to}, {$inc : {balance : amount}}).session(session);

    await session.commitTransaction();
    res.json({
        message : "Transaction Successfull!!"
    })
})

module.exports = router;