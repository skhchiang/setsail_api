/*jslint es6:true*/
/* jslint node: true */
/*global require, module,  __dirname */
"use strict";

const axios = require("axios")

class ButlerService {
    constructor() {}

     addTd (body) {
        console.log("tdId: ", body.userId, " tdDl: ", body.tdDl, " tdName: ", body.tdName);

        return axios.post("https://setsail-15ab8.firebaseio.com/todolist.json", {
            user_id: body.userId,
            todo_deadline: body.tdDl,
            todo_name: body.tdName,
            todo_created: Date()
        })
    }

    getTd(id) {
        console.log("id input: ", id)
        return axios.get(`https://setsail-15ab8.firebaseio.com/todolist/${id}.json`)

    }

    updateTd(id, body) {
        return axios.patch(`https://setsail-15ab8.firebaseio.com/todolist/${id}.json`, {
            todo_deadline: body.tdDl
        })
    }

    deleteTd(id) {
        return axios.delete(`https://setsail-15ab8.firebaseio.com/todolist/${id}.json`)
    }

    getAll(userid) {
        console.log("userid input: ", userid)
        return axios.get(`https://setsail-15ab8.firebaseio.com/todolist.json`)

    }
}

module.exports = ButlerService;