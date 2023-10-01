"use strict";

//  level 0
const dev = {
    app: {
        port: process.env.PORT || 3000,
    },
    db: {
        host: process.env.DB_HOST || 'DB_HOST',
        port: process.env.DB_PORT || 27017,
        name: process.env.DB_NAME || "shopDEV"
    }
}

const config = { dev };

const env = process.env.NODE_ENV || 'dev';

module.exports = config[env];