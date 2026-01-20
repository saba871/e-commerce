const User = require('../models/user.model');


const sendToken = (user, statusCode, res) => {
    const token = user.signToken();

    const options = {
        httpOnly: true,
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        secure: true,
        sameSite: 'None',
    };

    return res.status(statusCode).cookie('token', token, options).json({
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    });
}


const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        return res.status(200).json(users);
    } catch (error) {
        console.log('error in get users', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


// რეგისტრაცია
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Please fill all the fields' });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        const user = await User.create({ name, email, password });

        return sendToken(user, 201, res);
    } catch (error) {
        console.log('error is in signup', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


// ავტორიზაცია
const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Please fill all the fields' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'Invalid email or password' });
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        return sendToken(user, 200, res);
    } catch (error) {
        console.log('Error in login:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



// logout
const logOut = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
        });
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.log("error in logout", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    signup,
    logIn,
    logOut,
    sendToken,
    getUsers
};
