module.exports = {
  connect: function (io, PORT) {
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
      socket.on('message', (data) => {
        console.log(data);
        const { channel, message, username } = data; // Extract channel and message
        io.to(channel).emit('message',{ message, username}); // Broadcast the message to the specified channel
      });

      // Handle disconnections
      socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
      });
    });
  },
};
