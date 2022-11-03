// controller pour la page de profil d'un herbergeur

const Profile = require('../models/Profile');
const fs = require('fs'); // filesystem permet d'acceder aux fichiers (utilisé ici pour gérer le remplacement et suppression des images)
const sanitize = require('mongo-sanitize'); // se proteger des injections diverses



