const { ObjectId } = require('mongodb');

module.exports = async function (app, db) {
    app.delete('/api/users/:userId', async (req, res) => {
        try {
          const userId = req.params.userId;
          const objectId = new ObjectId(userId);
          const result = await db.collection('users').deleteOne({ _id: objectId });
      
          if (result.deletedCount === 0) {
            res.status(404).json({ error: 'User not found' });
          } else {
            res.sendStatus(204);
            console.log('removed successfully', result);
          }
        } catch (error) {
          console.error('Error deleting user:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });
  };