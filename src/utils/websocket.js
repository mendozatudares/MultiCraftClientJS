function initSocket(ip, port, callback) {
  const socket = new WebSocket(`ws://${ip}:${port}`);
  socket.onclose = function (event) {
    console.log(event.wasClean ? `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}` : "[close] Connection died");
  };
  socket.onerror = function (error) { console.error(`[error] ${error.message}`); };

  callback(socket);
}

function getUser(websocket, username, callback) {
  const message = { command: "login", username: username };
  websocket.send(JSON.stringify(message));
  websocket.onmessage = function (message) {
    callback(JSON.parse(message.data));
  };
}

function sendCommand(websocket, uuid, command, callback) {
  const message = { client_name: uuid, ...command };
  websocket.send(JSON.stringify(message));
}

export { initSocket, getUser, sendCommand };
