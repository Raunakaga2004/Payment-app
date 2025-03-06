const express = require("express")
const zod = require("zod")
const {user, account} = require("../db")
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const {authmiddleware} = require("./middleware")

const router = express.Router();

const zodSignUpSchema = zod.object({
    username : zod.string().email(),
    password : zod.string().min(8).max(32),
    firstname : zod.string(),
    lastname : zod.string()
})

router.post("/signup", async (req,res)=>{
    // Inputs are correct (validated via zod)
    const inputs = req.body;
    const result = zodSignUpSchema.safeParse(inputs);
    if(!result.success){
        // Inputs are incorrect, return error
        return res.status(401).json({
            "message" : "Incorrect inputs"
        })
    }
     // Inputs are correct, proceed with signup

    // Database doesn’t already contain another user
    if(await user.exists({username : result.data.username})){
        return res.status(401).json({
            "message" : "Email already taken"
        })
    }

    //Now the username doesn't exist in the database
    //Create a new user in the database
    const tempUser = await user.create({
        username : result.data.username, 
        password : result.data.password, 
        firstname : result.data.firstname, 
        lastname : result.data.lastname
    });

    const userID = tempUser._id
    
    const tempAccount = await account.create({
        userId : userID,
        balance : Math.random()*10000
    })

    const token = "Bearer " + jwt.sign({
        userID
    },JWT_SECRET)

    return res.json({
        "message" : "User created",
        "token" : token
    })
})

const zodSignInSchema = zod.object({
    username : zod.string().email(),
    password : zod.string().min(8).max(32),
})

router.post("/signin", async (req, res)=>{
    const {success} = zodSignInSchema.safeParse(req.body);
    if(success){
        // Inputs are correct, proceed with signin

        const tempUser =  await user.findOne({
            username : req.body.username,
            password : req.body.password
        })

        if(!tempUser){
            return res.status(401).json({
                "message" : "Invalid username or password"
            })
        }

        const userID = tempUser._id;
        if(tempUser){
            const token = "Bearer " + jwt.sign({
                userID
            }, JWT_SECRET)
            res.json({
                "message" : "User signed in",
                "token" : token
            })
            return;
        }
    }

    return res.status(401).json({
        "message" : "Error while logging in"
    })
})

const updateBody = zod.object({
    firstname : zod.string().optional(),
    lastname : zod.string().optional(),
    password : zod.string().min(8).max(32).optional()
})

router.put("/" , authmiddleware, async (req,res)=>{
    const update = updateBody.safeParse(req.body);
    if(update.success){
        // Inputs are correct, proceed with update
        const result = await user.updateOne({_id : req.userId}, {firstname : req.body.firstname , lastname : req.body.lastname, password : req.body.password})
        return res.json({
            message : "updated successfully"
        })
    }
    else return res.json({
        message : "Error while updating"
    })
})

router.get("/bulk", async (req, res)=>{
    const filter = req.query.filter || "";
    const users = await user.find({
        $or : [
            {firstname : new RegExp(filter, 'i')},
            {lastname : new RegExp(filter, 'i')}
        ]
    })
    res.json({
        "users" : users.map((u)=>{
            return {
                "firstname" : u.firstname,
                "lastname" : u.lastname,
                "username" : u.username,
                "id" : u._id
            }
        }) 
    })
})

router.get("/getuser", authmiddleware, async (req,res)=>{
    const temp_user = await user.findOne({_id : req.userId});
    if (!temp_user) {
        return res.status(404).json({ message: "User  not found" });
    }
    res.json({
        "username" : temp_user.username,
        "firstname" : temp_user.firstname,
        "lastname" : temp_user.lastname,
        "id" : temp_user._id
    })
})

module.exports = router;