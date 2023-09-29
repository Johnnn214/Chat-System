const { ObjectId } = require('mongodb');
module.exports = async function (app, db) {
  app.get('/api/chat/:id', async (req, res) => {
    try {
      const channelsCollection = db.collection('channels');
      const id = req.params.id;
    
      const _id = new ObjectId(id);

      const channel = await channelsCollection.find({ _id }).toArray();
      //console.log("channels",channels);
      //console.log("id", id);

      res.send(JSON.stringify(channel));
    } catch (error) {
      console.error('Error getting channels:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};