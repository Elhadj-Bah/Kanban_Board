import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


// define the the interface for the user object for the JWT payload
interface JwtPayload {
    username: string;
    password: string;
}

// TODO: verify the token exists and add the user data to the request object

export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    // get the token from the request headers
    const authHeader = req.headers.authorization;

    if (authHeader) {
        // split the token from the 'Bearer' keyword
        const token = authHeader.split(' ')[1];

        const secretKey = process.env.env.JWT_SECRET_KEY || ''; 

        // verify the token
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403); //  send forbidden status if the token is invalid
            }
            // add the user data to the request object

            req.user = user as JwtPayload;
             return next(); // continue to the next middleware
        });
    } else {
        res.sendStatus(401); //  send unauthorized status if the token is missing
    }

};
