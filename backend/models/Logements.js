const mongoose = require('mongoose');

const logementsSchema = mongoose.Schema({
    // ce sera l'id de l'user qui crée le logement
    userId: { type: String, required: true },
    // remplacer name par title (qui sera le titre du logement)
    name: { type: String, required: true },
    // description du logement
    description: { type: String, required: true },
    // remplacer imageUrl par cover (l'image de présentation du logement)
    imageUrl: { type: String, required: true },
    // il faudra adapter le systeme de likes avec les étoiles
    likes: { type: Number, default: 0, },
    dislikes: { type: Number, default: 0, },
    usersLiked: { type: [String], },
    usersDisliked: { type: [String], },
});

module.exports = mongoose.model('Logement', logementsSchema);


// schema d'apres le ficher logements.json
// host sera le nom et prénom de l'hebergeur
// picture sera la photo de profil (renommer en profilePict ?) 
// pour pictures, equipements et tags, ce sera un array de string
// pour rating la note sera par defaut à 0
id: { type: String, required: true }
title: { type: String, required: true }
cover: { type: String, required: true }
pictures: { type: [String], }
description: { type: String, required: true }
host: { type: String, required: true } 
picture: { type: String, required: true }
rating: { type: String, default: 0 }
location : { type: String, required: true }
equipements: { type: [String], }
tags: { type: [String], }

 