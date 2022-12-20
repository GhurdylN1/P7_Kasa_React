const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config('../.env');
const sanitize = require('mongo-sanitize');

const User = require('../models/User');

const fs = require('fs');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                fullName : req.body.fullName, 
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

// edition du profil
exports.upateUserProfile = (req, res, next) => {
    console.log(req.file)
   
    // on enregistre d'abord l'image de profil
    const userObject = req.file ? {
      ...JSON.parse(sanitize(req.body.user)),
      profilePict: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    // puis on demande de supprimer l'ancienne s'il y en avait déjà une
    if (req.file) {
        User.findOne({_id: req.params.id})
        .then((user) => {
          if(user.profilePict) {
             // récupération de l'image a supprimer si modification
          const filename = user.profilePict.split('/images/')[1];
    
          // suppression de l'ancienne image
          fs.unlink(`images/${filename}`, (error) => {
            if(error) throw error;
          })
          }
        })
        .catch((error) => res.status(404).json({error}))
      }

    User.findOne({_id: req.params.id})
    .then(() => {
      if (req.auth.userId === null) {
        res.status(401).json({ message : 'Not authorized' });
      } else {
        User.updateOne({ _id: req.params.id}, { ...userObject, _id: req.params.id})
        .then(() => res.status(200).json({message : 'Profil modifié!'}))
        .catch(error => res.status(401).json({error}));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    })
  };

// affichage des users

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