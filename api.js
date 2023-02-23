const express = require('express');
const app = express();
const https = require('https');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// const cors = require('cors');
require('dotenv/config');

//Middlewares
app.use(express.json({limit: '1mb'}));
app.use(bodyParser.json());

//Routes
const postRoute = require('./routes/posts');
const getRoute = require('./routes/gets')
app.use('/get', getRoute);
app.use('/post', postRoute);
app.use(express.static('public'))

const sslserver = https.createServer({
  key: fs.readFileSync(path.join(__dirname, 'https', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'https', 'cert.pem'))
}, app)

//Listen to server via port
sslserver.listen(3000, () => console.log('SSL Server on port 3000'));

try{
    mongoose.connect(process.env.DB_CONNECT, () => {
        console.log("Connection made!");
      });
}catch(err){
    console.log("Did not connect " + err);
}

