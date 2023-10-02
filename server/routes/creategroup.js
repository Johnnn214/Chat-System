module.exports = async function (app,db) {
    app.post('/api/groups', async (req, res) => {
        try {
          const collection = db.collection('groups');
          const newGroup = req.body;
          console.log(req.body);
          const result = await collection.insertOne(newGroup);
          
          res.status(200).json(result); 
        } catch (error) {
          console.error('Error adding product:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });

}