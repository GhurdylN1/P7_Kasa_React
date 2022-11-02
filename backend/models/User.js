const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
    // rajouter le nom de l'host, sa photo de profil et sa présentation
    // name: { type: String, required: true }
    // profilePict: { type: String, required: true }

});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema); 