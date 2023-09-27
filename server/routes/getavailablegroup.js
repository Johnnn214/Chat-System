const { ObjectId } = require('mongodb');

module.exports = async function (app, db) {

  // API to get groups that were not selected by a user
  app.get('/api/groups/other-groups/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const objectId = new ObjectId(userId);

      // Assuming you have a 'users' collection and a 'groups' collection
      const user = await db.collection('users').findOne({ _id: objectId });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Fetch the groups associated with the user
      const groupIds = user.group || [];
      const groupObjectIds = groupIds.map(id => new ObjectId(id));

      // Fetch all groups that are NOT in the user's groups
      const otherGroups = await db.collection('groups').find({ _id: { $nin: groupObjectIds } }).toArray();

      res.status(200).json(otherGroups);
    } catch (error) {
      console.error('Error fetching other groups:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
}