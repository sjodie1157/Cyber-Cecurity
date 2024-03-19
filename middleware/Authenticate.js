import jwt from 'jsonwebtoken';
import 'dotenv/config'
const { sign, verify } = jwt;

// Created webtoken function
function createToken(user) {
    return sign({
        userEmail: user.userEmail,
        userPass: user.userPass,
        userRole: user.userRole
    },
        process.env.SECRET_KEY,
        {
            expiresIn: '1h'
        }
    )
}


// verifying webtoken

// User Verification
function verifyAToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        status: 401,
                        msg: 'Invalid token'
                    });
                } else {
                    req.user = decoded;
                    next();
                }
            });
        } else {
            res.status(401).json({
                status: 401,
                msg: 'Please Login'
            });
        }
    } else {
        res.status(401).json({
            status: 401,
            msg: 'Invalid Bearer token'
        });
    }
}
// Admin Verification
function verifyAdminToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        status: 401,
                        msg: 'Invalid token'
                    });
                } else {
                    req.user = decoded;
                    if (decoded.userRole === 'Admin') {
                        next();
                    } else {
                        return res.status(403).json({
                            status: 403,
                            msg: 'Access forbidden: Not an admin'
                        });
                    }
                }
            });
        } else {
            res.status(401).json({
                status: 401,
                msg: 'Please Login'
            });
        }
    } else {
        res.status(401).json({
            status: 401,
            msg: 'Invalid Bearer token'
        });
    }
}

export { createToken, verifyAToken, verifyAdminToken };

