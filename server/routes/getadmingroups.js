module.exports = async function (app,db) {

    app.get('/api/groups/admin/:id', async (req, res) => {
        try {
            const username = req.params.id;
            const groupsCollection = db.collection('groups');
            const adminGroups = await groupsCollection.find({ admins: id }).toArray();
            res.send(JSON.stringify(adminGroups));
        } catch(error) {
            console.error('Error getting groups:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}