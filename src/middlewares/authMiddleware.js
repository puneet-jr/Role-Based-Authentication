import jwt from 'jsonwebtoken';

const verifyToken=(req,res,next)=>{

    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;

    if(authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
    }

    if(!token) {
        return res.status(401).json({message: 'Unauthorized, no token provided'});
    }

    try{

        const decoded= jwt.verify(token, process.env.JWT_SECRET);
        req.user=decoded;
        console.log("Decoded user:", req.user);
        next();

    }catch(error){
        res.status(400).json({message: 'Invalid token'});
    }




}

export {verifyToken};