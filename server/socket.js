module.exports = {
  connect: function (io, PORT) {
    io.on('connection', (socket) => {
      console.log('User connected on port ' + PORT + ': ' + socket.id);

      // Handle incoming messages
      socket.on('message', (message) => {
        console.log('Message received:', message);

        // Broadcast the message to all connected clients
        io.emit('message', message);
      });

      // Handle disconnections
      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });
  },
};
