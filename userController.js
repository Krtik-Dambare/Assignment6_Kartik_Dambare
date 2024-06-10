const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, email });
    await user.save();
    res.status(201).send('User registered');
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id, isAdmin: user.isSystemUser }, process.env.JWT_SECRET);
        res.json({ token });
    } else {
        res.sendStatus(401);
    }
};

exports.getCurrentUser = async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json(user);
};
