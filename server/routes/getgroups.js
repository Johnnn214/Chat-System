module.exports = async function (app,db) {

    app.get('/api/getgroups', async (req, res) => {
        try {
            const collection = db.collection('groups');
            const groups = await collection.find({}).toArray();
            res.send(JSON.stringify(groups));
        } catch(error) {
            console.error('Error getting groups:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}