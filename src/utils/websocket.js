function initSocket(ip, port, callback) {
  const socket = new WebSocket(`ws://${ip}:${port}`);
  socket.onopen = function (event) {
    console.log(`[OPEN ${socket.url}] Connection established`);
  };
  socket.onclose = function (event) {
    console.log(
      event.wasClean
        ? `[CLOSE ${socket.url}] Connection closed cleanly, code=${event.code}, reason=${event.reason}`
        : `[CLOSE ${socket.url}] Connection died, code=${event.code}`
    );
  };
  socket.onerror = function (error) {
    console.error(`[ERROR ${socket.url}] ${error.message}`);
  };

  callback(socket);
}

function getUser(websocket, username, callback) {
  const message = { command: "login", username: username };
  websocket.send(JSON.stringify(message));
  websocket.onmessage = function (message) {
    callback(JSON.parse(message.data));
  };
}

function sendCommand(websocket, uuid, command) {
  const message = { client_name: uuid, ...command };
  websocket.send(JSON.stringify(message));
}

export { initSocket, getUser, sendCommand };
