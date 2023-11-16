import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const adminCredentials = {
    email: 'wajidakbar123@gmail.com',
    password: 'wajid123',
};

export const loginAdmin = (req, res) => {
    const { email, password } = req.body;

    if (email === adminCredentials.email && password === adminCredentials.password) {
        // Successful login, generate and send a JWT token
        const token = jwt.sign({ email: adminCredentials.email}, 
            
            process.env.SECRET_KEY,
             {
            expiresIn: '10h', 
             }
             );
        console.log(token);
        res.send({ token });
    } else {
        // Login failed
        res.status(401).send('Login failed');
    }
};