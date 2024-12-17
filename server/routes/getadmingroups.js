const { ObjectId } = require('mongodb');
module.exports = async function (app,db) {

    app.get('/api/groups/admin/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const groupsCollection = db.collection('groups');
            const adminGroups = await groupsCollection.find({ admins: id }).toArray();

            // Fetch the user document
            const objectId = new ObjectId(id);
            const user = await db.collection('users').findOne({ _id: objectId });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            //console.log(user);
            const userGroupIds = user.group || [];
            const groupObjectIds = userGroupIds.map(id => new ObjectId(id));
            
            const memberGroups = await db.collection('groups').find({
                _id: { $in: groupObjectIds },
                admins: { $ne: id }
            }).toArray();

            // Combine the results and remove duplicates if necessary
            const combinedGroups = [...adminGroups, ...memberGroups];

            res.send(JSON.stringify(combinedGroups));

            //res.send(JSON.stringify(adminGroups));
        } catch(error) {
            console.error('Error getting groups:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}