const PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);

var fs = require('fs');
var cors = require('cors')
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()) ;

const { MongoClient } = require('mongodb');
const url = 'mongodb://0.0.0.0:27017/';
const client = new MongoClient(url);
//app.use(express.static(__dirname, '../dist/'));

async function main() {
    try {
      await client.connect();
      let db = client.db("assignmentdb");
      console.log('Connected to MongoDB');

      require('./routes/login.js')(app,db)
    
      require('./routes/getusers.js')(app,db);
      require('./routes/createuser.js')(app,db);
      require('./routes/deleteuser.js')(app,db);
      require('./routes/addusertogroup.js')(app,db);
      require('./routes/getusersingroup.js')(app,db);

      require('./routes/creategroup.js')(app,db);
      require('./routes/deletegroup.js')(app,db);
      require('./routes/getadmingroups.js')(app,db);
      require('./routes/getgroups.js')(app,db);

      require('./routes/createchannel.js')(app,db);
      require('./routes/getchannel.js')(app,db);
      require('./routes/deletechannel.js')(app,db);

      require('./listen.js')(http,PORT);
      
  
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  main().catch(console.error);




