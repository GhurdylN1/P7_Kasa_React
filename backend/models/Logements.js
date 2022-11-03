const mongoose = require('mongoose');

const logementsSchema = mongoose.Schema({
    // ce sera l'id de l'user qui crée le logement ou l'id du logement => lodgingId à rajouter ? 
    userId: { type: String, required: true },
    title: { type: String, required: true },
    cover: { type: String, required: true },
    pictures : { type: [String], },
    description: { type: String, required: true },
    rating: { type: Number, default: 0 },
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


// schema d'apres le ficher logements.json
// host est déplacé dans le model profile
// pour pictures, equipements et tags, ce sera un array de string
// pour rating la note sera par defaut à 0
// id: { type: String, required: true }
// title: { type: String, required: true }
// cover: { type: String, required: true }
// pictures: { type: [String], }
// description: { type: String, required: true }
// rating: { type: Number, default: 0 }
// location : { type: String, required: true }
// equipements: { type: [String], }
// tags: { type: [String], }

 
