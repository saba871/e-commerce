const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ error: 'Not authorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ error: 'Not authorized' });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log('error in protect middleware', error);

        return res.status(401).json({ error: 'Not authorized' });
    }
}


module.exports = { protect };
