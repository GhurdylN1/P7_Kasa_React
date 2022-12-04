const Logement = require('../models/Logements');
const fs = require('fs'); // filesystem permet d'acceder aux fichiers (utilisé ici pour gérer le remplacement et suppression des images)
const sanitize = require('mongo-sanitize'); // se proteger des injections diverses

// création des logements

exports.createLogement = (req, res, next) => {
  // console.log(req.body.logement)
  console.log(req.files)
  const logementObject = JSON.parse(sanitize(req.body.logement)); // exemple d'utilisation de sanitize
  delete logementObject._id;
  delete logementObject._userId;
  const logement = new Logement ({
    ...logementObject,
    userId: req.auth.userId,
    cover: `${req.protocol}://${req.get('host')}/images/${req.files.image[0].filename}`,
    pictures: req.files.pictures.map(file => `${req.protocol}://${req.get('host')}/images/${file.filename}`)
    // cover: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    // pictures: req.files.pictures.map(file => "/images/" + file.filename)
    // pictures: req.files.map(file => "/images/" + file.filename)
  });

  logement.save()
    .then(() => { res.status(201).json({message: 'Logement enregistrée'})})
    .catch(error => { res.status(400).json( { error })})
  };

// modification des logements

  exports.modifyLogement = (req, res, next) => {
    // mise a jour de la DB
    const logementObject = req.files ? {
      ...JSON.parse(sanitize(req.body.logement)),
      cover: `${req.protocol}://${req.get('host')}/images/${req.files.image[0].filename}`,
      pictures: req.files.pictures.map(file => `${req.protocol}://${req.get('host')}/images/${file.filename}`)
      // cover: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    //puis on demande de supprimer les anciennes images s'il y en avait déjà
    if (req.files) {
      Logement.findOne({_id: req.params.id})
      .then((logement) => {
        if(logement.cover && logement.pictures) {
          // récupération de l'image a supprimer si modification
          const filename = logement.cover.split('/images/')[1];
          const picturesArray = logement.pictures
          // picturesArray.forEach((element) => {
          //   const picturesFilenames = element.split('http://localhost:5000/images/')[1];
          //   console.log(picturesFilenames)
          // })        
          // for (const element of picturesArray) {
          //   const picturesFilenames = element.split('http://localhost:5000/images/')[1];
          //   console.log(picturesFilenames)
          // }
          // console.log(" ")
          // console.log(filename)
          // console.log(picturesArray)
  
          // suppression de l'ancienne image
          fs.unlink(`images/${filename}`, (error) => {
            if(error) throw error;
          })
  
          // suppression des "pictures"
          for (const element of picturesArray) {
            fs.unlink(`images/${element.split('http://localhost:5000/images/')[1]}`, (error) => {
              if(error) throw error;
            })
          }
        }
      })
      .catch((error) => res.status(404).json({ error }))
    }

    delete logementObject._userId;
    Logement.findOne({_id: req.params.id})
    .then((logement) => {
      if (logement.userId != req.auth.userId) {
        res.status(401).json({ message : 'Not authorized' });
      } else {
        Logement.updateOne({ _id: req.params.id}, { ...logementObject, _id: req.params.id})
        .then(() => res.status(200).json({message : 'Logement modifiée!'}))
        .catch(error => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    })
  };

// suppression des logements

  exports.deleteLogement = (req, res, next) => {
    Logement.findOne({ _id: req.params.id})
        .then(logement => {
            if (logement.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                const filename = logement.cover.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Logement.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Logement supprimée !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
 };

// affichage des logements

  exports.getOneLogement = (req, res, next) => {
    Logement.findOne({ _id : req.params.id })
    .then(logement => res.status(200).json(logement))
    .catch(error => res.status(404).json({ error }));
  };

  exports.getAllLogements = (req, res, next) => {
    Logement.find()
    .then(logements => res.status(200).json(logements))
    .catch(error => res.status(400).json({ error }));
    };

  exports.getAllLogementsByUserId = (req, res, next) => {
    Logement.find({ userId : req.params.userId })
    .then(logements => res.status(200).json(logements))
    .catch(error => res.status(400).json({ error }));
    };



// test systeme de vote par étoiles (pour l'instant on update "averageRating" => tests ok)
exports.voteLogement = (req, res, next) => {
  Logement.findOne({_id: req.params.id})
  .then(() => { 
    Logement.updateOne({_id: req.params.id},
      {
      $set: { averageRating: req.body.averageRating }
    })
    .then(() => res.status(200).json({ message: "Vote utilisateur enregistré"}))
    .catch((error) => res.status(401).json({ error }));
})
}


// Fonctionalité Likes et Dislikes (à modifier pour le systeme de notation a étoiles)

// exports.voteLogement = (req, res, next) => {
//   Logement.findOne({_id: req.params.id})
//   .then((logement) => {
//     // constantes like et dislike
//     const voteLike = logement.usersLiked.includes(req.body.userId)
//     const voteDislike = logement.usersDisliked.includes(req.body.userId)

//     // Un utilisateur veut liker un logement
//     if (req.body.like === 1 && !voteLike) {
//       //on ajoute un like et l'id de l'utilisateur dans la liste des Likers , on va utiliser $inc et $push pour cela. 
//       Logement.updateOne({_id: req.params.id}, {
//         $inc: { likes: 1 },
//         $push: { usersLiked: req.body.userId }
//       })
//       .then(() => res.status(200).json({ message: "user's Like added"}))
//       .catch((error) => res.status(401).json({ error }));
//     }

//     // Un utilisateur veut disliker un logement
//     else if (req.body.like === -1 && !voteDislike) {
//       //on ajoute un dislike et l'id de l'utilisateur dans la liste des Dislikers , on va utiliser $inc et $push pour cela.
//       Logement.updateOne({ _id: req.params.id}, {
//         $inc: { dislikes: 1 },
//         $push: { usersDisliked: req.body.userId }
//       })
//       .then(() => res.status(200).json({ message: "user's Dislike added"}))
//       .catch((error) => res.status(401).json({ error }));
//     }

//     // Si l'utilisateur veut retirer son like ou dislike
//     else if (req.body.like === 0) {
//       if (voteLike) {
//          //on retire un like et l'id de l'utilisateur dans la liste des Likers , on va utiliser $inc et $pull ici.
//           Logement.updateOne({ _id: req.params.id }, {
//               $inc: { likes: -1 },
//               $pull: { usersLiked: req.body.userId, }
//           }).then(() => { res.status(200).json({ message: "user's Like removed" }) })
//               .catch(error => res.status(401).json({ error }));
//       }
//       else if (voteDislike) {
//           Logement.updateOne({ _id: req.params.id }, {
//               $inc: { dislikes: -1 },
//               $pull: { usersDisliked: req.body.userId, }
//           }).then(() => { res.status(200).json({ message: "user's Dislike removed'" }) })
//               .catch(error => res.status(401).json({ error }));
//       }
//   }
// })
// .catch((error) => {
//   res.status(400).json({ error });
//   });
// }