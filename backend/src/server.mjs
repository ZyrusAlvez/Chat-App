import express from "express";
import mongoose from "mongoose";
import { PORT, database } from "./config.mjs";
import chatHistoryRouter from "./route/chatHistoryRoute.mjs";
import userRouter from "./route/userRoute.mjs"
import cors from "cors";
import { Server } from "socket.io";

const app = express();

// Middleware
app.use(cors()); // cors for https request
app.use(express.json());

// Routes
app.use("/api/chat", chatHistoryRouter);
app.use("/api/user", userRouter);


let online = 0
// Connect to MongoDB and start the server
mongoose
  .connect(database)
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}`);
    });

    // Create the Socket.IO server using the Express server's instance
    const io = new Server(server, {
      cors: {
        // cors for websocket
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      // "socket" paramter is an object that represents an individual client who triggered the event
      // this do not represent every client's connection
      online++
      console.log("online users: ", online)

      socket.on("disconnect", () => {
        console.log("a client has disconnected");
        online--;
        console.log("online users: ", online)
      })

      // this waits for the event called "message"
      socket.on("message", (messageData) => {

        // Broadcast the message to all connected clients
        // if this is `socket.emit`, this will only emit to the client who triggered the "message" event
        io.emit('receive-message', messageData)
      });
    });

  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err.message);
  });
