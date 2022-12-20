const mongoose = require('mongoose');

const logementsSchema = mongoose.Schema({ 
    userId: { type: String, required: true },
    title: { type: String, required: true },
    cover: { type: String },
    pictures : { type: [String], },
    description: { type: String, required: true },
    // note moyenne
    averageRating: { type: Number, default: 0 },
    // note et avis par utilisateur
    usersRatings: [{
        userId: { type: String, required: true },
        userRating: { type: Number, required: true },
        userReview: { type: String, required: true },
     }],
    location : { type: String, required: true },
    equipements: { type: [String], },
    tags: { type: [String], }
});

module.exports = mongoose.model('Logement', logementsSchema);
 
