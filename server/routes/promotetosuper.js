const { ObjectId } = require('mongodb');

module.exports = async function (app, db) {
  app.post('/api/promotetosuper/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const objectId = new ObjectId(userId);

      // Check if the user is already a super admin
      const user = await db.collection('users').findOne({ _id: objectId, roles: 'super' });

      if (user) {
        return res.status(400).json({ error: 'User is already a super admin' });
      }

      const isGroupAdmin = await db.collection('users').findOne({ _id: objectId, roles: 'admin' });

      if (!isGroupAdmin) {
        await db.collection('users').updateOne(
          { _id: objectId },
          { $push: { roles: { $each: ['super', 'admin'] } } }
        );
      }else{
        await db.collection('users').updateOne(
          { _id: objectId },
          { $push: { roles: 'super' } }
        );
      }
     
      res.status(200).json({ message: 'User promoted to super admin' });
    } catch (error) {
      console.error('Error promoting user to super admin:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};