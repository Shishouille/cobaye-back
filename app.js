// .env
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Controllers Routes
// const XRoutes = require('./routes/X');
const userRoutes = require('./routes/user');
const expRoutes = require('./routes/experience');
const criteriaRoutes = require('./routes/criteria');


const app = express();

const whitelist = ['http://localhost:8080'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};

app.use(bodyParser.json()); // application/json
app.use(cors(corsOptions)); // application/json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Routes Controllers
// app.use('/X', XRoutes);
app.use('/experiences', expRoutes);
app.use('/users', userRoutes);
app.use(criteriaRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(result => {
    app.listen(3000);
    console.log('Connected')
  })
  .catch(err => console.log(err));
