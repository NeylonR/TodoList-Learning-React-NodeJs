const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email : req.body.email, 
                password : hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé.'}))
                .catch(error => res.status(400).json({ error, message : 'Mail already used.' }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getAllUsers = (req,res) => {
    User.find()
    .then(users => res.status(201).json(users))
    .catch(error => res.status(400).json({error}));
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ email: email }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        // create JWTs
        const token = jwt.sign(
            {
                "UserInfo": {
                    "email": foundUser.email,
                }
            },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '1h' }
        );
        const refreshToken = jwt.sign(
            { "email": foundUser.email },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ token });

    } else {
        res.sendStatus(401);
    }
};