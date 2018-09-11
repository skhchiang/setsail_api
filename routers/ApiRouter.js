/*jslint es6:true*/
/* jslint node: true */
/*global require, module,  __dirname */
"use strict";

const express = require("express");
const app = express();
const ButlerRouter = require('../routers/ButlerRouter');
const ButlerService = require('../services/ButlerService');
const butlerService = new ButlerService();


class ApiRouter {

    constructor() {
        this.butlerService = butlerService;
    }
    getRouter() {
        const router = express.Router();
        const butlerRouter = new ButlerRouter(this.butlerService);

        router.use("/", butlerRouter.getRouter());
        return router
    }
}

module.exports = ApiRouter