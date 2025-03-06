const mongo = require("mongoose");

//mongo db connection
mongo.connect("mongodb+srv://raunakaga12:12022004@cluster0.bg2nhff.mongodb.net/paytm").then(()=>{
    console.log("Mongo DB connected successfully...");
}).catch((err)=>{
    console.log(err);
    console.log("Error occured in MongoDB connection...");
})

//schema
const user_Schema = new mongo.Schema({
    firstname : String,
    lastname : String, 
    username : String,
    password : String,
})

//mongodb model
const user = new mongo.model('user', user_Schema);

//bank database schema
const bank_Schema = new mongo.Schema({
    userId : {
        type : mongo.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    balance : {
        type : Number,
        required : true,
        default : 0
    }
})

const account = new mongo.model('account', bank_Schema);

//to export
module.exports = {user, account}; //Exports the todoModel as an object