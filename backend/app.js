const dotenv = require('dotenv').config('../.env');
const cors = require('cors');

const express = require('express');
const helmet = require("helmet");
const mongoose = require('mongoose');

const logementRoutes = require('./routes/logement');
const userRoutes = require('./routes/user');

//connexion à la base de donnée MongoDB avec le package Mongoose et Dotenv
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_NAME}.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true`, 
{useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
const path = require('path');

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/logements', logementRoutes);
app.use('/api/users', userRoutes); // test axios
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

// app.use((error, req, res, next) => {
//   console.log('This is the rejected field ->', error.field);
// });

module.exports = app;