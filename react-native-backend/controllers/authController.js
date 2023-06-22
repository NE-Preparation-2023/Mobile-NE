const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User, userValidationSchema} = require('../models/userModel');
const {check, validationResult} = require('express-validator')

//generate jwt token function
const generateToken = (user) => {
    return jwt.sign({
        names: user.names,
        email: user.email,
        password: user.password
    }, process.env.SECRET_KEY, {
        expiresIn: '30d'
    });
}

exports.userSignup = [
    check('names', 'Names is required').exists(),
    check('email').exists().isEmail(),
    check('password').isLength({min: 6}),
    async(req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {names, email, password} = req.body;

        const userExists = await User.findOne({ email });

        if(userExists) {
            return res.status(400).send({error: 'Email already exists'});
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            names: names,
            email: req.body.email,
            password: hashedPassword,
        });

        await user.save();

        return res.status(201).json({
            message: 'Signup successful',
            data: user
        });
    } catch (error) {
        console.error('Signup error: ', error);
        return res.status(500).json({
            error: 'Server error'
        });
    }
}]

exports.userLogin = [
    check('email', 'email is Required').exists().isEmail(),
    check('password', 'Password is Required').exists(),
    async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).send({error: 'Invalid email or password'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).send({error: 'Invalid email or password. '});
        }

        //Password is valid, authentication successful
        const token = generateToken(user);

        res.setHeader('Authorization', `Bearer ${token}`);
        return res.status(200).json({
            message: 'Login Successful',
            token
        });
    } catch (error) {
        console.error('Login error: ', error);
        return res.status(500).json({
            errror: 'Server error'
        });
    }
}]

exports.userLogout = async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token;
        });

        await req.user.save();
        res.send();
    } catch (error) {
        console.error('Logout error: ', error);
        res.status(500).json({
            error: 'Server error'
        });
    }
}