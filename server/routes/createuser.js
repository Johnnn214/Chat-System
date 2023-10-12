module.exports = async function (app, db) {
    app.post('/api/createuser', async (req, res) => {
      try {
        const user = req.body;
        const result = await db.collection('users').insertOne(user);
        console.log('Insert result:', result);
        res.status(200).json(result); // Optionally, send a response with the result
      } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  };