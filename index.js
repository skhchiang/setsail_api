/*jslint es6:true*/
/* jslint node: true */
/*global require, module,  __dirname */
"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const ApiRouter = require('./routers/ApiRouter');

const ButlerRouter = require('./routers/ButlerRouter');
const ButlerService = require('./services/ButlerService');

const butlerService = new ButlerService();
const apiRouter = new ApiRouter(butlerService);
let butlerRouter = new ButlerRouter(butlerService);



app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use("/api", apiRouter.router());

app.listen(3000, () => {
    console.log(`Application started at port: 3000`);
});