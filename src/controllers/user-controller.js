const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

exports.register = async (req, res) => {
    try {

        var { name, lastName, email, password, admin } = req.body;

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

        return res.status(201).send('User created!');
    } catch (error) {
        console.log(error);
        return res.status(400).send('User not created!');
    }
}

const generateToken = (params = {}) => {
    return jwt.sign(params, process.env.secretKey, {
        expiresIn: 86400
    });
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');
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
        return res.status(400).send('Login failed!');
    }
}