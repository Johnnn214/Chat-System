const { ObjectId } = require('mongodb');

module.exports = async function (app, db) {
  app.delete('/api/groups/:groupId/users/:userId', async (req, res) => {
    try {
      const usersCollection = db.collection('users');
      const groupId = req.params.groupId;
      const userId = req.params.userId;

      // Validate and convert the group and user IDs to ObjectId
      const userObjectId = new ObjectId(userId);

      // Check if the user exists in the group and remove them
      const result = await usersCollection.updateOne(
        { _id: userObjectId },
        { $pull: { group: groupId } }
      );

      if (result.modifiedCount === 0) {
        return res.status(404).json({ error: 'User not found in the group' });
      }

      return res.status(200).json({ message: 'User removed from the group' });
    } catch (error) {
      console.error('Error removing user from group:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};