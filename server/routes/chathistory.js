module.exports = async function (app, db) {
    app.get('/api/chat-history/:channel', async (req, res) => {
      try {
        const channel = req.params.channel;
        const chatCollection = db.collection('messages'); 
        const chatHistory = await chatCollection.find({ channel }).sort({ timestamp: 1 }).toArray();
          res.send(JSON.stringify(chatHistory));
        } catch (error) {
          console.error('Error fetching chat history:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });

}