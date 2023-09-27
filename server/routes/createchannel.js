const { ObjectId } = require('mongodb'); // Import ObjectId for converting IDs

module.exports = async function (app, db) {
  app.post('/api/groups/:id/channel', async (req, res) => {
    try {
      const channelsCollection = db.collection('channels');
      const { name } = req.body; // Destructure name from req.body
      const { id: groupId } = req.params; // Destructure id from req.params
      console.log(req.body); // Corrected console.log

      const newChannel = {
        msg: [],
        name,
        groupId: new ObjectId(groupId), // Use 'new' with ObjectId to create an instance
      };

      const result = await channelsCollection.insertOne(newChannel);

      console.log('Insert result:', result);
    } catch (error) {
      console.error('Error creating channel:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};