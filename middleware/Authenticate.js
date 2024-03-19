import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { sign, verify } = jwt;

// Created web token function
function createToken(user) {
    return sign({
        userEmail: user.userEmail,
        userPass: user.userPass,
        userRole: user.userRole
    },
        process.env.SECRET_KEY,
        {
            expiresIn: '1h'
        });
}

// Verifying web token
function verifyAToken(req, res, next) {
    try {
        // Check if the 'cookie' header exists in the request
        if (req.headers.cookie) {
            // Extract the token from the cookie
            const tokenCookie = req.headers.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
            if (tokenCookie) {
                const token = tokenCookie.split('=')[1];
                // Verify the token
                const decoded = verify(token, process.env.SECRET_KEY);
                // Attach decoded token to request for further processing
                req.decodedToken = decoded;
                // If verification is successful, proceed to the next middleware
                next();
            } else {
                throw new Error('Token not found in cookies');
            }
        } else {
            throw new Error('Cookie header not found');
        }
    } catch (error) {
        // If any error occurs during token verification or extraction, send a 401 Unauthorized response
        res.status(401).json({
            status: 401,
            msg: error.message || 'Authentication failed'
        });
    }
}

// Verify if user is an admin
function verifyAdmin(req, res, next) {
    try {
        // Check if decoded token exists in the request
        if (req.decodedToken) {
            // Extract user role from decoded token
            const userRole = req.decodedToken.userRole;
            console.log(userRole);
            
            // Check if user role is admin
            if (userRole === 'admin') {
                // If user is an admin, proceed to the next middleware
                next();
            } else {
                // If user is not an admin, send a 403 Forbidden response
                throw new Error('User is not authorized as an admin');
            }
        } else {
            // If decoded token does not exist, send a 401 Unauthorized response
            throw new Error('Decoded token not found');
        }
    } catch (error) {
        // If any error occurs during admin verification, send a 403 Forbidden response
        res.status(403).json({
            status: 403,
            msg: error.message || 'Admin verification failed'
        });
    }
}

export { createToken, verifyAToken, verifyAdmin };
