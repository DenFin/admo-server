const User = require('../models/user.model')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.registerUser = async function(req, res, next) {
    console.log(req.body)
    const { username, email, password } = req.body
    try {
        const userExists = await User.findOne({ email: email })
        if (!!userExists) {
            const errorMessage = `User with E-Mail ${email} already exists.`
            const error = new Error(errorMessage)
            res.status(409).json({
                error: errorMessage
            })
            error.statusCode = 409
            throw error
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({
            username: username,
            email: email,
            password: hashedPassword
        })
        const result = await user.save()
        res.status(200).json({
            message: "User created",
            user: { id: result._id, email: result.email }
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

}

let loadedUser;
exports.loginUser = async function(req, res, next) {
    console.log("LOGIN USER")
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            const error = new Error("No user found")
            error.statusCode = 401;
            res.status(401).json({ error: error })
            throw error;
        }

        loadedUser = user;

        const comparePassword = await bcrypt.compare(password, user.password);
        console.log(comparePassword)
        console.log({ password })

        if (!comparePassword) {
            const error = new Error("password is not match!");
            error.statusCode = 401;
            res.status(401).json({ error: error })
            throw error;
        }

        const token = jwt.sign({ email: loadedUser.email }, "expressnuxtsecret", {
            expiresIn: "20m", // it will expire token after 20 minutes and if the user then refresh the page will log out
        });
        res.status(200).json({ token: token });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

}

exports.getUser = (req, res, next) => { // this function will send user data to the front-end as I said above authFetch on the user object in nuxt.config.js will send a request and it will execute

    res.status(200).json({
        user: {
            id: loadedUser._id,
            username: loadedUser.username,
            email: loadedUser.email,
        },
    });
};