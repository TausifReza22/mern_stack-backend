const JWT_SECRET = 'jais@123';
import jwt from 'jsonwebtoken';
// create token here
const createToken = (tokenData)=>{
    return jwt.sign({tokenData},JWT_SECRET , {expiresIn:'1h'})
}

// tokenVerify here 
const authMiddleware = async (req, res, next) => {

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.jwtData = data.user;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    // console.log("role",req.jwtData.role);
    if (req.jwtData.role === 'admin') {
        next();  // User is an admin, proceed with the request
    } else {
        res.status(403).json({ error: 'Admin access only' });
    }
};

export {authMiddleware , createToken ,isAdmin}