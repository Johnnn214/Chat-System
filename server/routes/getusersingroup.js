//const { ObjectId } = require('mongodb');

module.exports = async function (app, db) {
  app.get('/api/groups/:groupId/users', async (req, res) => {
    try {
      const userCollection = db.collection('users');
      const groupId = req.params.groupId;
      //const objectId = new ObjectId(groupId);

      // Find users in the specified group
      const usersInGroup = await userCollection.find({ group: groupId }).toArray();

      res.status(200).json(usersInGroup);
    } catch (error) {
      console.error('Error fetching users in group:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};