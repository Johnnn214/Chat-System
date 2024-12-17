const { ObjectId } = require('mongodb');

module.exports = async function (app, db) {

  app.get('/api/groups/other-groups/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const objectId = new ObjectId(userId);

      const user = await db.collection('users').findOne({ _id: objectId });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Fetch the groups associated with the user
      const groupIds = user.group || [];
      const groupObjectIds = groupIds.map(id => new ObjectId(id));

      // Fetch all groups that are NOT in the user's groups
      //const otherGroups = await db.collection('groups').find({ _id: { $nin: groupObjectIds } }).toArray();

       // Find all groups where the user is NOT an admin and NOT part of the group
       const otherGroups = await db.collection('groups').find({
        _id: { $nin: groupObjectIds },
        admins: { $nin: [userId] } // Exclude groups where the user is an admin
      }).toArray();

      res.status(200).json(otherGroups);
    } catch (error) {
      console.error('Error fetching other groups:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
}