import {io} from 'socket.io-client';
// need io() to connect our app to the socket server.
let socket = null;
// Create a variable to store the socket connection.
// Initially there is no connection, so it is null.

// Create a function that connects to the socket server.

export const connectSocket = token => {
  socket = io('https://mntrendigo.mntech.website', {
    // connect the socket server URL.

    query: {
      token, // Send user token while connecting.
      // Server uses this token to identify the user.
    },
    transports: ['websocket'],
    // Use WebSocket for real-time communication.
  });

  return socket;
};

export const getSocket = () => socket;

// When the screen opens, we connect to the socket server using the user's token. If the connection is successful, we get a Socket ID. If there is an error, we log it. When the user leaves the screen, we disconnect the socket to avoid unnecessary connections.
