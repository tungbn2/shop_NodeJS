"use strict";
const {db:{host, port, name}} = require("../configs/config.mongodb")

const mongoose = require('mongoose');
const connectString = `mongodb://${host}:${port}/${name}`;

// dev
class Database{
    constructor(){
        this.connect();
    }

    connect(type = 'mongodb'){
        if (1===0){
            mongoose.set('debug', true);
            mongoose.set('debug', {color: true});
        }
        console.log(connectString);
        mongoose.connect(connectString, {maxPoolSize: 50})
        .then(() => console.log("connected DB"))
        .catch(err => console.log(err));
    }

    static getInstance() {
        if (!Database.instance){
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const mongodb = Database.getInstance();

module.exports = mongodb;