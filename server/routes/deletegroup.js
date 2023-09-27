const { ObjectId } = require('mongodb');

module.exports = async function (app, db) {

    app.delete('/api/groups/:groupId', async (req, res) => {
        try {
        const groupcollection = db.collection('groups');
        const channelCollection = db.collection('channels');
        const groupId = req.params.groupId;
        
        // Convert the productId string to ObjectId
        const objectId = new ObjectId(groupId);
    
        const resultGroup = await groupcollection.deleteOne({ _id: objectId });
        const resultChannels = await channelCollection.deleteMany({ groupId: objectId });

        console.log('Group removed successfully', resultGroup);
        console.log('Related channels removed:', resultChannels);
        
        } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' });
        }
    });

}