const Logement = require('../models/Logements');
const fs = require('fs'); // filesystem permet d'acceder aux fichiers (utilisé ici pour gérer le remplacement et suppression des images)
const sanitize = require('mongo-sanitize'); // se proteger des injections diverses

// création des logements

exports.createLogement = (req, res, next) => {
  // console.log(req.files)
  const logementObject = JSON.parse(sanitize(req.body.logement)); // exemple d'utilisation de sanitize
  delete logementObject._id;
  delete logementObject._userId;
  const logement = new Logement ({
    ...logementObject,
    userId: req.auth.userId,
    cover: `${req.protocol}://${req.get('host')}/images/${req.files.image[0].filename}`,
    pictures: req.files.pictures.map(file => `${req.protocol}://${req.get('host')}/images/${file.filename}`)
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
    } : { ...req.body };

    //puis on demande de supprimer les anciennes images s'il y en avait déjà
    if (req.files) {
      Logement.findOne({_id: req.params.id})
      .then((logement) => {
        if(logement.cover && logement.pictures) {
          // récupération de l'image a supprimer si modification
          const filename = logement.cover.split('/images/')[1];
          const picturesArray = logement.pictures
  
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
        .then(() => res.status(200).json({message : 'Logement modifié !'}))
        .catch(error => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    })
  };

// suppression du logement

  exports.deleteLogement = (req, res, next) => {
    Logement.findOne({ _id: req.params.id})
        .then(logement => {
            if (logement.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                const filename = logement.cover.split('/images/')[1];
                const picturesArray = logement.pictures
                for (const element of picturesArray) {
                  fs.unlink(`images/${element.split('http://localhost:5000/images/')[1]}`, (error) => {
                    if(error) throw error;
                  })
                }
                fs.unlink(`images/${filename}`, () => {
                    Logement.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Logement supprimé !'})})
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

// syteme de notation par étoiles
exports.voteLogement = (req, res, next) => {
  Logement.findOne({_id: req.params.id})
  .then((logement) => { 
    
    let promise;

    // id de l'utilisateur qui vote
    const votingUserId = req.body.usersRatings.userId
    // console.log(votingUserId)

    // note de l'utilisateur qui vote
    const userRatingValue = req.body.usersRatings.userRating
    // console.log(userRatingValue)

    // commentaire de l'utilisateur qui vote
    const userReviewValue = req.body.usersRatings.userReview
    // console.log(userReviewValue)

    // array des utilisateurs ayants voté
    const usersRatings = logement.usersRatings
    // console.log(usersRatings)

    // On compare les userId pour metre à jour le vote d'un user qui avait déjà voté ou ajouter un nouveau vote user. 
    const findUserId = (users, userId) => users.find(user => user.userId === userId)
    const users = logement.usersRatings
    const userRated = findUserId(users, votingUserId)
    // console.log(userRated.userId)

    // récupération de toutes les notes d'un logement pour ensuite calculer la note moyenne
    // const findAllLogementRatings = usersRatings.map(function (ratings) {return ratings.userRating})
    // const AllRatings = findAllLogementRatings
    // console.log(AllRatings)
    
    // Somme de toutes les notes
    // const sum = AllRatings.reduce((accumulator, value) => {
    //   return accumulator + value;
    // }, 0);
    // console.log(sum);

    // calcul de la note moyenne
    // const averageNote = AllRatings.reduce((accumulator, value) => accumulator + value, 0) / AllRatings.length;
    // console.log(averageNote);


    // si l'utilisateur à déjà voté, alors on update son vote
    if (userRated) {
      userRated.userRating = userRatingValue
      userRated.userReview = userReviewValue
      promise = Logement.updateOne({_id: req.params.id}, 
      {
      $set: { usersRatings : [...usersRatings]}
    })
    // si l'utilisateur n'as pas encore voté, on ajoute son vote
    } else {
      promise = Logement.updateOne({_id: req.params.id}, 
        {
          $push: { 
            usersRatings : 
            {
               userId : votingUserId,
               userRating : userRatingValue,
               userReview : userReviewValue,
            },
          },
       }
      )
    // Et en dernier on veut mettre a jour la note moyenne en prenant en compte la nouvelle note
    } 
    promise.then(() => {
      Logement.findOne({_id: req.params.id})
      .then((logementUpdated) => {
        const findAllLogementRatings = logementUpdated.usersRatings.map(function (ratings) {return ratings.userRating})
        const averageNote = findAllLogementRatings.reduce((accumulator, value) => accumulator + value, 0) /findAllLogementRatings.length;
        Logement.updateOne({_id: req.params.id},
          {
          $set: { averageRating: averageNote }
        })
        .then(() => res.status(200).json({ message: "Vote utilisateur enregistré et note moyenne mise a jour"}))
      })

    })
    .catch((error) => res.status(401).json({ error }));
})
}