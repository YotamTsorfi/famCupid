import socket from "./socket";

export function sendPrivateMessage(senderId, recipientId, message, timestamp) {
  socket.emit("private_message", { senderId, recipientId, message, timestamp });
}

export function login(user) {
  socket.emit("login", user);
}
