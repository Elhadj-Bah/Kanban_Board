import { Router } from 'express';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

      // TODO: If the user exists and the password is correct, return a JWT token

// login function to authenticate the user
export const login = async (req: Request, res : Response) => {
    const { username, password } = req.body;

    // find the user in the database by username

    const user = await User.findOne({ 
        where: { username: username }
    });

    // if the user does not exist, return a 401 status
    if (!user) {
        return res.sendStatus(401).json({ message: 'Authentication failed' });
    }  
    
    // compare the password with the hashed password
    const passwordIsValid = await bcrypt.compare(password, user.password);

    // if the password is invalid, return a 401 status
    if (!passwordIsValid) {
        return res.sendStatus(401).json({ message: 'Authentication failed' });
    }
   // get the secret key from the environment variables
    const secretKey = process.env.JWT_SECRET_KEY || '';

    // create a JWT token
    
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    // return the token
    return res.json({ token });       
};

// create a new router

const router = Router();

// POST /login - Login a user
router.post('/login', login);
export default router;
