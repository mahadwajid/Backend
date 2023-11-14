import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const auth = (req, res, next) => {
    const authHeader=req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    

    if(!token) {
        return res.status(401).send('Access denied. Missing Token');
    }

    try {
        const verify = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verify;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send('Token has expired');
        }
        console.log(error);
        return res.status(403).send('Invalid Token.');
    }
}