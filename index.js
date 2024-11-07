const express = require("express")
const {JWT_SECRET,auth} = require("./auth.js")
const jwt = require("jsonwebtoken")
const {UserModel,TodoModel} = require("./db.js")
const app = express()
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://ayushkarwa18:eXigFYCKqNXJYAVl@cluster0.a6tu0.mongodb.net/todo-database-app").
then(()=>{
    console.log("Database Connected...");
})
app.use(express.json());




app.post("/signup",async(req,res)=>{

    const {email,password,name} = req.body

    await UserModel.create({
        email: email,
        password: password,
        name: name
    })
    res.json({
        message:"you signed up successfully!"
    })
})

app.post("/signin",async(req,res)=>{

    const {email,password} = req.body

    const user = await UserModel.findOne({
        email:email,
        password:password
    })
    console.log(user);

    if(user){
        console.log("the user id: "+user._id.toHexString())
        const token = jwt.sign({
            id: user._id.toString()
        },JWT_SECRET)
        res.json({
            message:"You signed in succesfully!",
            token: token
        })
    }else{
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }

})

app.post("/todo",auth,async(req,res)=>{

    const {title,done}= req.body
    const userId = req.userId
    
    await TodoModel.create({
        title:title,
        done: done,
        userId: userId

    })

    
    res.json({
        message: "Todo created successfully!"
    })
    
})

app.get("/todos",auth,async(req,res)=>{

    const userId = req.userId

    const todos = await TodoModel.findOne({
        userId:userId
    })
    if(todos){ 
    console.log("This are the todos: "+todos);
    console.log(JSON.stringify(todos.title,todos.done))
    res.json({
        todo: {
            title: todos.title,
            status: todos.done
        }
    })
    }else{
        res.json({
            message:"todo does not exist"
        })
    }
    
})

app.listen(3000,()=>{
    console.log("listening on port 3000...")
})