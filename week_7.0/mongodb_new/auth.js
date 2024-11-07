const dotenv = require("dotenv")
dotenv.config()
const jwt  =require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_TOKEN



function auth(req,res,next){
    try{ 
    const token = req.headers.token
    const decodedToken = jwt.verify(token,JWT_SECRET)
    if(decodedToken){
        req.userId = decodedToken.id
        next()
    }
}catch{
    res.status(403).json({
        message: "Invalid token"
    })
}
}

module.exports = ({
    JWT_SECRET,
    auth
})