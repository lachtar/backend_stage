const jwt = require('jsonwebtoken'); 

const dotenv = require("dotenv");
dotenv.config() ;

//
const verifyToken = (req,res, next)=>{
    
    let token ; 
    if(req.headers.authtoken && req.headers.authtoken.startsWith('Bearer')){
        token = req.headers.authtoken.split(' ')[1];
    }
    if(!token) return res.status(401).json({message: "access denied"});

    try{

        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified ; 
        next();


    }catch(err){
        res.status(400).json('invalid token');
    }
}

module.exports = {verifyToken }