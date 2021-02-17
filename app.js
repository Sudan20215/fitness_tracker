const express = require('express');
const path = require('path')
const logger = require("morgan");
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const db = require("./models");


const app = express();
const url = 'mongodb://localhost:meroshare';



MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('sampledb');
    const exerciseCollection = db.collection('exercise');

  })

app.use(logger("dev"));  
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
