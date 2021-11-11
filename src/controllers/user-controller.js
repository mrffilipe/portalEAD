const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

const generateToken = (params = {}) => {
    return jwt.sign(params, process.env.SECRET_KEY, {
        expiresIn: 86400
    });
}

exports.login = async (req, res, next) => {
    if (req.params.entry == 'register') return next();
    try {
        let { email, password } = req.body;

        let user = await User.findOne({ email }).select('+password');
        if (!user)
            return res.status(400).send({ error: 'User not found!' });

        if (!await bcrypt.compare(password, user.password))
            return res.status(400).send({ error: 'Invalid password' });

        user.password = undefined;

        return res.status(200).send({
            token: generateToken({ id: user._id, admin: user.admin }),
            userInfo: {
                name: user.name,
                lastName: user.lastName
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'Login failed!' });
    }
}

exports.register = async (req, res) => {
    try {
        let { name, lastName, email, password, admin } = req.body;

        if (await User.findOne({ email: email }))
            return res.status(400).send('User already exists!');

        password = await bcrypt.hash(password, 10);

        await User.create({
            name,
            lastName,
            email,
            password,
            admin
        });

        return res.status(201).send({ message: 'User registered!' });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'User not created!' });
    }
}