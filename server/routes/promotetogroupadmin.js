const { ObjectId } = require('mongodb');

module.exports = async function (app,db) {

    app.post('/api/promotetoadmin/:userId', async (req, res) => {
        try {
          const userId = req.params.userId;
          const objectId = new ObjectId(userId);
          
          const user = await db.collection('users').findOne({ _id: objectId, roles: 'group' });

          if (user) {
            return res.status(400).json({ error: 'User is already a group admin' });
          }
    
          // Update the user's role to 'group admin' in your database logic
         await db.collection('users').updateOne({ _id: objectId }, { $push: { roles: 'group' } });
      
          res.status(200).json({ message: 'User promoted to group admin' });
        } catch (error) {
          console.error('Error promoting user to group admin:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
    });

}

