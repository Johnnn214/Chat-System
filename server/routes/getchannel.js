
const { ObjectId } = require('mongodb');
module.exports = async function (app, db) {
  app.get('/api/groups/:id/channels', async (req, res) => {
    try {
      const channelsCollection = db.collection('channels');
      const id = req.params.id;
      

      const groupId = new ObjectId(id);
      // Query for channels with the matching groupId
      const channels = await channelsCollection.find({ groupId }).toArray();
      //console.log("channels",channels);
      //console.log("id", id);

      res.send(JSON.stringify(channels));
    } catch (error) {
      console.error('Error getting channels:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};