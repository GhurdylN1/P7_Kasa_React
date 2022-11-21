const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config('../.env');
const sanitize = require('mongo-sanitize');

const User = require('../models/User');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                fullName : req.body.fullName, // pour le test nouveau signUp
                password: hash
        });
        user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
            .catch(error => res.status(409).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({email: sanitize(req.body.email)}) //exemple sanitize 
        .then(user => {
            if (user === null) {
                res.statusMessage = "Identifiants incorrects"
                return res.status(401).json({message: 'Paire identifiant/mot de passe incorrect'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        res.statusMessage = "Identifiants incorrects"
                        return res.status(401).json({message: 'Paire identifiant/mot de passe incorrect'});
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.JWT_KEY_SIGNATURE,
                            { expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// affichage des users pour test axios

exports.getOneUser = (req, res, next) => {
    User.findOne({ _id : req.params.id })
    .then(User => res.status(200).json(User))
    .catch(error => res.status(404).json({ error }));
  };

  exports.getAllUsers = (req, res, next) => {
    User.find()
    .then(Users => res.status(200).json(Users))
    .catch(error => res.status(400).json({ error }));
    };