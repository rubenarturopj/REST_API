// this is our main structure for the server

import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import mongoose from "mongoose";
import router from "./router";

const app = express();

app.use(
    cors({
        credentials: true,
    })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log("Server running on http://localhost:8080/");
});

const MONGO_URL =
    "mongodb+srv://admin:admin@cluster001.73tel4n.mongodb.net/?retryWrites=true&w=majority";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));

// Router. To register a user, the arriving request goes to src/router/index,
// from there it goes to src/router/authentication to be treated. From there, through {register}
// it goes to src/controller/authentication to be controlled/treated/middleware.
app.use("/", router());
