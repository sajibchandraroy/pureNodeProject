// dependencies
const http = require('http');
require('dotenv').config()
const { handleReqRes } = require('./helpers/handleReqRes');


// app object - module scaffolding
const app = {};

// configuration
app.config = {
    port: 5000 || process.env.PORT,
};

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`listening to port ${app.config.port}`);
    });
};

// handle Request Response
app.handleReqRes = handleReqRes

// start the server
app.createServer();




