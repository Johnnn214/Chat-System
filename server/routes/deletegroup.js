const { ObjectId } = require('mongodb');
module.exports = async function (app, db) {
    
    app.delete('/api/getgroups/:groupId', async (req, res) => {
        try {
        const collection = db.collection('groups');
        const groupId = req.params.groupId;
        
        // Convert the productId string to ObjectId
        const objectId = new ObjectId(groupId);
    
        const result = await collection.deleteOne({ _id: objectId });
        console.log('removed successfully', result);
        res.send();
        
        } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' });
        }
    });

}