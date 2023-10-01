const mongoose = require("mongoose");
const os = require("os");
const process = require("process");
const _SECONDS = 500000;

// count connections
const countConnection = () => {
    const numConnections = mongoose.connections.length;
    console.log(`Number of connections: ${numConnections}`);
}

// check over load
const checkOverLoad = () => {
    setInterval(() => {
        const numConnections = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;

        const maxConnections = numCores * 5;
        
        console.log(`Number of connections: ${numConnections} connections`);
        console.log(`Memory usage: ${memoryUsage/ 1024 / 1024} MB`);
        if (numConnections > maxConnections){
            console.log("Connections over load!!!");
        }
    }, _SECONDS)
};

module.exports = {
    countConnection,
    checkOverLoad
}