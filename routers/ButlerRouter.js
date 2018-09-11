/*jslint es6:true*/
/* jslint node: true */
/*global require, module,  __dirname */
"use strict";

const express = require("express");
const butlerService = require('../services/ButlerService');


class ButlerRouter {

    constructor (butlerService) {
        this.butlerService = butlerService;
    }

    getRouter() {
        let router = express.Router();
        router.post("/", this.add.bind(this));
        router.get("/:id", this.read.bind(this));
        router.patch("/:id", this.change.bind(this));
        router.delete("/:id", this.remove.bind(this));
        router.get("/all/:userid", this.readAll.bind(this));
        return router;
    }

    add(req, res) {
        //created time will be stored as well
        console.log("addTd Router accessed")
        return this.butlerService
            .addTd(req.body)
            .then((data) => {res.json(data.data)})
            .catch(err => { console.log("post err", err); 
            res.status(500).json(err)
        })
    }

    read(req, res) {
        return this.butlerService.getTd(req.params.id)
            .then((data) => res.json(data.data))
            .catch((err) => res.status(500).json(err))
    }

    change(req, res) {
        return this.butlerService.updateTd(req.params.id, req.body)
            .then(() => {return this.butlerService.getTd(req.params.id)})
            .then((data) => { console.log("updateTd Accessed", data.data); res.json(data.data)})
            .catch((err) => res.status(500).json(err))
    }

    remove(req, res) {
        return this.butlerService.getTd(req.params.id)
            .then((data) => (!data.data) ? res.json(400, "Data does not exist") : this.butlerService.deleteTd(req.params.id))
            .then((data) => res.json("Delete Successful"))
            .catch((err) => res.status(500).json("Delete Failed", err))
    }

    readAll(req,res) {
        return this.butlerService.getAll(req.params.userid)

            .then((data) => res.json(Object.values(data.data).filter(input => input.user_id == req.params.userid)))
            .catch((err) => res.status(500).json(err))
    }


}

module.exports = ButlerRouter