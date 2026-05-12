import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import pollRoutes from "./routes/poll.routes.js";

import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

connectDB();

const app = express();

const server = createServer(app);

export const io = new Server(server, {
    cors: {
      origin: "*",
       methods: [ "GET", "POST" ],
      },
  });

  io.on( "connection", (socket) => {
    console.log( "User connected:",socket.id );
    
    socket.on(
      "disconnect",
      () => {
        console.log( "User disconnected:", socket.id );
      }
    );

  }
);


app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://192.168.0.102:5173"
  ],
  credentials: true,
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/auth", authRoutes);

app.use("/api/polls", pollRoutes);

const PORT = process.env.PORT || 8000;

server.listen( PORT, () => {
  console.log( `Server running on port ${PORT}`);
  }
);