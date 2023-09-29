const { ObjectId } = require('mongodb');
module.exports = function(app,db){
    //Route to manage image file uploads
    app.post('/api/updateuser', async (req, res) => {
        let data = req.body;
        console.log('data', data);
        //make sure a user of that ID exists.
        const objectId = new ObjectId(data.user.id);
        console.log(objectId);
        let user = await db.collection("users").findOne({_id:objectId});
        console.log(data.user.avatar);
        
        if (user){
          let result = await db.collection("users").updateOne({_id: objectId},{$set:{avatar: data.user.avatar}});
          console.log(result);
          res.send({ok:true});
          return true;
        }

    })
       
}