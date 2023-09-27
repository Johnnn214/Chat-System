const { ObjectId } = require('mongodb');

module.exports = async function (app, db) {

    app.delete('/api/groups/:groupId/channel/:channelId', async (req, res) => {
        try {
            const collection = db.collection('channels');
            const channelId = req.params.channelId;

            // Convert the channelId string to ObjectId
            const objectId = new ObjectId(channelId);

            const result = await collection.deleteOne({ _id: objectId });
            console.log('Channel removed successfully', result);

            if (result.deletedCount === 1) {
                res.status(200).json({ message: 'Channel deleted successfully' });
            } else {
                res.status(404).json({ error: 'Channel not found' });
            }
        } catch (error) {
            console.error('Error deleting channel:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

}