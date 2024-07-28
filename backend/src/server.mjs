import express from "express";
import mongoose from "mongoose";
import { PORT, database } from "./config.mjs";
import chatHistoryRouter from "./route/chatHistoryRoute.mjs";
import cors from "cors";
import { Server } from "socket.io";

const app = express();

// Middleware
app.use(cors()); // cors for https request
app.use(express.json());

// Routes
app.use("/api/chat", chatHistoryRouter);

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
      socket.on("message", (data) => {
        console.log(data);
    
        // Broadcast the message to all connected clients
        io.emit('receive-message', data)
      });
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err.message);
  });
