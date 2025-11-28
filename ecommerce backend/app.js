import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import publicRouter from "./router/public.js";
import adminRouter from "./router/adminrouter.js";
import userRouter from "./router/userrouter.js";
import { connectDb } from "./database/db.js";

import cors from "cors"

dotenv.config();
connectDb();

const server = express();
const app = express.Router()

server.use('/productImages', express.static('productImages'))
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(cors({
  origin: ["http://16.170.231.213"],
  credentials: true
}));


server.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: "sessions"
  })
}))



app.use("/admin", adminRouter);
app.use("/", userRouter);
app.use("/", publicRouter);

server.use('/api', app)

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
