// model de profil hébergeur

const mongoose = require('mongoose');

const profileSchema = mongooseSchema ({
    // name modifié en hostName
    hostName: { type: String, required: true },
    profilePict: { type: String, required: true },
    hostDescription: { type: String, required: true }
});

module.exports = mongoose.model('Profile', profileSchema);