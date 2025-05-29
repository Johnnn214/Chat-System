
var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');
var cors = require('cors')

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()) ;
app.use('/images',express.static('userimages'));

const { MongoClient } = require('mongodb');
// host
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);
const io = require('socket.io')(http,{
cors:{
    origin:"http://localhost:4200",
    methods:["GET","POST"],
  }
});
const PORT = process.env.PORT || 3000;
const formidable = require('formidable');
const path = require('path');

async function main() {
    try {
      await client.connect();
      let db = client.db("ChatSystem");
      console.log('Connected to MongoDB');

      const sockets = require('./routes/socket.js');
      sockets.connect(io, PORT, db);

      require('./routes/login.js')(app,db);

      require('./routes/uploads.js')(app,formidable,fs,path);
      require('./routes/updateuser.js')(app,db);
    
      require('./routes/getusers.js')(app,db);
      require('./routes/createuser.js')(app,db);
      require('./routes/deleteuser.js')(app,db);
      require('./routes/addusertogroup.js')(app,db);

      require('./routes/promotetosuper.js')(app,db);
      require('./routes/promotetogroupadmin.js')(app,db);

      require('./routes/getusersingroup.js')(app,db);
      require('./routes/deleteuseringroup.js')(app,db);

      require('./routes/creategroup.js')(app,db);
      require('./routes/deletegroup.js')(app,db);
      require('./routes/getadmingroups.js')(app,db);
      require('./routes/getgroups.js')(app,db);
      require('./routes/getusergroups.js')(app,db);
      require('./routes/getavailablegroup.js')(app,db);
      

      require('./routes/createchannel.js')(app,db);
      require('./routes/getchannel.js')(app,db);
      require('./routes/getchannelbyid.js')(app,db);
      require('./routes/deletechannel.js')(app,db);
      require('./routes/chathistory.js')(app,db);

      require('./routes/listen.js')(http,PORT);
  
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  main().catch(console.error);




