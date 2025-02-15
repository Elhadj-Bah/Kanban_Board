import jwt from 'jsonwebtoken';
// Middleware to authenticate the token
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    // Get the the authorization header from the request
    const authHeader = req.headers.authorization;
    //check if the authorization header is set
    if (authHeader) {
        // Get the token from the authorization header  
        const token = authHeader.split(' ')[1];
        // Get the secret key from the environment variables
        const secretKey = process.env.JWT_SECRET_KEY || '';
        // Verify the token
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            // Add the user data to the request object
            req.user = user;
            return next();
        });
    }
    else {
        res.sendStatus(401); // Unauthorized
    }
    ;
};
