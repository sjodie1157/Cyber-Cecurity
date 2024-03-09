import jwt from 'jsonwebtoken';

const { sign, verify } = jwt;

// Created webtoken function
function createToken(user) {
    return sign({
        userEmail: user.userEmail,
        userPass: user.userPass
    },
        process.env.SECRET_KEY,
        {
            expiresIn: '1h'
        }
    )
}


// verifying webtoken
function verifyAToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({
            status: res.statusCode,
            msg: 'Please Login'
        });
    }

    try {
        const decoded = verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).json({
            status: res.statusCode,
            msg: 'Invalid Token'
        });
    }
}


export { createToken, verifyAToken };
