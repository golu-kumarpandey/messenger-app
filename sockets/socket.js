const io = require("socket.io")(8000, {
  cors: {
    origin: "*",
    method: ["GET", "POST", "PUT", "DELETE"],
  },
});

let users = [];
const addUser = (userId, socketId, userInfo) => {
  const userIndex = users.findIndex((u) => u.userId === userId);

  // Replace stale socket ids after refresh/reconnect.
  if (userIndex !== -1) {
    users[userIndex] = { userId, socketId, userInfo };
  } else {
    users.push({
      userId,
      socketId,
      userInfo,
    });
  }
};

const removeUser = (id) => {
  // console.log(id, "toDeleteId");
  // console.log(users, "user before logout");

  users = users.filter((u) => {
    return u.socketId !== id;
  });

  // console.log(users, "user after logout");
};

const checkUser = (id) => {
  return users.find((obj) => {
    return obj.userId === id;
  });
};

io.on("connection", (socket) => {
  console.log("socket is connecting", socket.id);

  socket.on("addUser", (userId, userInfo) => {
    addUser(userId, socket.id, userInfo);
    console.log(users, "addUser");
    io.emit("getUser", users);
  });

  socket.on("sendMessage", (message) => {
    console.log("seen message is working");
    const user = checkUser(message?.reciverId);
    if (user !== undefined) {
      socket.to(user.socketId).emit("getMessage", message);
    }
  });

  socket.on("typing", (data) => {
    const user = checkUser(data.reciverId);
    if (user) {
      console.log("typing is working");
      socket.to(user.socketId).emit("typing", data);
    }
  });

  socket.on("msgSeenSocket", (data) => {
    const user = checkUser(data.senderId);
    console.log(user, "seen user");
    if (user) {
      console.log("seen socket is working");
      socket.to(user.socketId).emit("msgResponseSeenSocket", data);
    }
  });

  socket.on("msgDeleveredSocket", (data) => {
    const user = checkUser(data.senderId);
    if (user) {
      socket.to(user.socketId).emit("msgResponseDeleveredSocket", data);
    }
  });

  socket.on("logout", (user) => {
    socket.disconnect(true);
    socket.broadcast.emit("add-user", user);
  });

  socket.on("addSocketFriendToList", (user) => {
    console.log("socket backend me aa gaya");
    console.log(user);
    socket.broadcast.emit("addSocketResponseToList", user);
  });

  socket.on("disconnect", (data) => {
    removeUser(socket.id);
    io.emit("getUser", users);
    console.log("after disconnecting  user", users);
  });
});
