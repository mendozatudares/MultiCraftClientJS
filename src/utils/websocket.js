function getUser(ip, username, callback) {
  const socket = new WebSocket(`ws://${ip}:8887`);

  socket.onopen = function (e) {
    console.log("[open] Connection established");
    const message = { command: "login", username: username };
    socket.send(JSON.stringify(message));
    socket.onmessage = function (message) {
      callback(JSON.parse(message.data));
      socket.close(1000, "Retrieved uuid");
    };
  };

  socket.onclose = function (event) {
    if (event.wasClean) {
      console.log(
        `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
      );
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      console.log("[close] Connection died");
    }
  };

  socket.onerror = function (error) {
    console.error(`[error] ${error.message}`);
  };
}

function sendCommand(ip, uuid, command, callback) {
  const socket = new WebSocket(`ws://${ip}:8887`);

  socket.onopen = function (e) {
    console.log("[open] Connection established");
    const message = {uuid: uuid, ...command};
    socket.send(JSON.stringify(message));
    socket.close(1000, "Command sent");
  };

  socket.onclose = function (event) {
    if (event.wasClean) {
      console.log(
        `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
      );
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      console.log("[close] Connection died");
    }
  };

  socket.onerror = function (error) {
    console.error(`[error] ${error.message}`);
  };
}

export { getUser, sendCommand };
