const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//Middlewares
app.use(bodyParser.json()); 

//Routes
const postRoute = require('./routes/posts');
const getRoute = require('./routes/gets')
app.use('/get', getRoute);
app.use('/posts', postRoute);



mongoose.connect(process.env.DB_CONNECT, () => {
  console.log("Connection made!");
})

//Listen to server via port
app.listen(3000);
app.use(express.static('public'))
