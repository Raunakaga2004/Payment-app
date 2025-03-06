const exp = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
// const {user} = require("./db");
const mainRouter = require("./routes/index")

const app = exp();

const port = 3000;

app.use(exp.json()); //body parser

app.use(cors());

app.use("/api/v1", mainRouter) // all request will start with this string and then go to mainRouter
//this is used to store different versions of the backend request processing

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})

