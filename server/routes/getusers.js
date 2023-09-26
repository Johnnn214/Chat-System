module.exports = async function (app,db) {
  
  app.get('/api/getusers', async (req, res) => {
    try {
        const collection = db.collection('users');
        const users = await collection.find({},{ projection: { password: 0 } }).toArray();
        res.send(JSON.stringify(users));

    } catch(error) {
        console.error('Error getting users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  });
}