module.exports = {
  connect: function (io, PORT, db, async) {
    // Initialize socket.io on the server
    io.on('connection', (socket) => {
      console.log('User connected on port ' + PORT + ': ' + socket.id);
      // Handle joining a channel
      socket.on('join', async (data) => {
        const messagesCollection = db.collection('messages');
        socket.join(data.channel);
        console.log(`User ${socket.id} joined channel: ${data.channel}`);
        console.log(data);
        const { channel, user, message } = data;
        const username = user.username;
        const avatar = user.avatar;
        const newMessage = {
          channel,
          username,
          avatar,
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

      // Handle leaving a channel
      socket.on('leave', async (data) => { 
        const messagesCollection = db.collection('messages');
        socket.leave(data.channel);
        console.log(`User ${socket.id} left channel: ${data.channel}`);
        console.log(data);
        const { channel, user, message } = data;
        const username = user.username;
        const avatar = user.avatar;
        const newMessage = {
          channel,
          username,
          avatar,
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

      // Handle incoming messages within a channel
      socket.on('message', async (data) => {
        // Extract channel, username, and message from data
        const { channel, user, message } = data;
        const messagesCollection = db.collection('messages');
        // Create a new ChatMessage document
        const username = user.username;
        const avatar = user.avatar;

        console.log(username);
        const newMessage = {
          channel,
          username,
          avatar,
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
