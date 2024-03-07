import jwt from 'jsonwebtoken';

const { sign, verify } = jwt;

// Created webtoken function
function createToken(user) {
    return sign({
        userID: user.userID,
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


// veryfying webtoken
function verifyAToken(req, res, next) {
    const token = req?.headers['Authorisation']
    if (token) {
        if (verify(token, process.env.SECRET_KEY)) {
            next()
        } else {
            res?.json({
                status: res.statusCode,
                msg: 'Incorrect User Details'
            })
        }
    } else {
        res?.json({
            status: res.statusCode,
            msg: 'Please Login'
        })
    }
}

export { createToken, verifyAToken };