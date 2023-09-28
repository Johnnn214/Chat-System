const { ObjectId } = require('mongodb');

module.exports = async function (app, db) {

  app.get('/api/groups/users/:userId/', async (req, res) => {
    try {
      const userId = req.params.userId;
      const objectId = new ObjectId(userId);
      //console.log(userId);
      // Assuming you have a 'users' collection and a 'groups' collection
      const user = await db.collection('users').findOne({ _id: objectId });
     // console.log(user);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // You need to implement the logic to fetch groups associated with this user
      // This could involve querying the 'groups' collection based on the user's ID or another attribute
      
      // For example, if the user has a 'groupIds' field that contains group IDs
      const groupIds = user.group || []; // Fix the property name here
      console.log(groupIds);

      const groupObjectIds = groupIds.map(id => new ObjectId(id));
      console.log(groupObjectIds);

      const groups = await db.collection('groups').find({ _id: { $in: groupObjectIds } }).toArray();
      console.log(groups);
      res.send(JSON.stringify(groups));
      //res.status(200).json(groups);
    } catch (error) {
      console.error('Error fetching user-specific groups:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
}