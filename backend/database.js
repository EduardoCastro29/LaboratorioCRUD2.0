import e from "express";
import mongoose from "mongoose";

import { config } from "./config.js";
mongoose.connect(config.db.URI);
const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("DB is connected");
});

connection.once("disconnected",(error)=>{
    console.log("DB is disconnected"+error);
});

connection.once("error",(error)=>{
    console.log("error found"+error);
});
