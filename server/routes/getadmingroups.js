module.exports = async function (app,db) {

    app.get('/api/groups/admin/:username', async (req, res) => {
        try {
            const username = req.params.username;
            const groupsCollection = db.collection('groups');
            const adminGroups = await groupsCollection.find({ admins: username }).toArray();
            res.send(JSON.stringify(adminGroups));
        } catch(error) {
            console.error('Error getting groups:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}