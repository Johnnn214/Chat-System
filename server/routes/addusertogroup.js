//const { ObjectId } = require('mongodb');

module.exports = async function (app, db) {
  app.post('/api/groups/:id/users', async (req, res) => {
    try {
      const userCollection = db.collection('users');
      const { username } = req.body; // Destructure the username from the request body
      const groupId = req.params.id;
      //const objectId = new ObjectId(groupId);

      // Find the user by username and group by _id
      const user = await userCollection.findOne({ username });


      if (!user || !groupId ) {
        // Handle the case where the user or group does not exist
        res.status(404).json({ error: 'User or group not found' });
        return;
      }

      // Check if the user is already associated with the group
      if (user.group.includes(groupId)) {
        res.status(400).json({ error: 'User is already in the group' });
        return;
      }

      // Add the group's name to the user's groups array
      await userCollection.updateOne(
        { _id: user._id },
        { $push: { group: groupId } }
      );

      res.status(200).json({ message: 'User added to the group' });
    } catch (error) {
      console.error('Error adding user to group:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};