module.exports = {
  connect: function (io, PORT, db) {
    // Initialize socket.io on the server
    io.on('connection', (socket) => {
      console.log('User connected on port ' + PORT + ': ' + socket.id);

      // Handle joining a channel
      socket.on('join', (channel) => {
        socket.join(channel);
        console.log(`User ${socket.id} joined channel: ${channel}`);
      });

      // Handle leaving a channel
      socket.on('leave', (channel) => {
        socket.leave(channel);
        console.log(`User ${socket.id} left channel: ${channel}`);
      });

      // Handle incoming messages within a channel
      socket.on('message', async (data) => {
        // Extract channel, username, and message from data
        const { channel, username, message } = data;
        const messagesCollection = db.collection('messages');
        // Create a new ChatMessage document
        const newMessage = {
          channel,
          username,
          message,
          timestamp: new Date(),
        };
        // Save the message to the database
        try {
          const result = await messagesCollection.insertOne(newMessage);
          console.log('Insert result:', result);
          io.to(channel).emit('message', data);
        } catch (error) {
          console.error('Error saving message to MongoDB:', error);
        }
      });

      // Handle disconnections
      socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
      });
    });
  },
};
