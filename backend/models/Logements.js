const mongoose = require('mongoose');

const logementsSchema = mongoose.Schema({ 
    userId: { type: String, required: true },
    title: { type: String, required: true },
    cover: { type: String },
    pictures : { type: [String], },
    description: { type: String, required: true },
    // note moyenne
    averageRating: { type: Number, default: 0 },
    // note par utilisateur
    usersRatings: [{
        userId: { type: String, required: true },
        userRating: { type: Number, required: true },
     }],
    location : { type: String, required: true },
    equipements: { type: [String], },
    tags: { type: [String], }
    // il faudra adapter le systeme de likes avec la notation par étoiles
    // likes: { type: Number, default: 0, },
    // dislikes: { type: Number, default: 0, },
    // usersLiked: { type: [String], },
    // usersDisliked: { type: [String], },
});

module.exports = mongoose.model('Logement', logementsSchema);
 
