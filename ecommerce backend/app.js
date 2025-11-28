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

const app = express();
app.use('/productImages', express.static('productImages'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ["http://16.170.231.213"],
  credentials: true
}));


app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: "sessions"
  })
}))



app.use("/api/admin", adminRouter);
app.use("/api/", userRouter);
app.use("/api/", publicRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
