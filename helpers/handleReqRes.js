const url = require('url');
const fs = require('fs');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler');


// modue scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
    // request handling
    // get the url and parse it
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;

    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject,
    };

    if (path === '/') {
        fs.readFile('./index.html', function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHeader(200, { "Content-Type": "text/html" });
            res.write(html);
            res.end();
        });
    }
    else {
        const decoder = new StringDecoder('utf-8');
        let realData = '';

        const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

        req.on('data', (buffer) => {
            realData += decoder.write(buffer);
        });

        req.on('end', () => {
            realData += decoder.end();

            // requestProperties.body = parseJSON(realData);

            chosenHandler(requestProperties, (statusCode, payload) => {
                statusCode = typeof statusCode === 'number' ? statusCode : 500;
                payload = typeof payload === 'object' ? payload : {};
                const payloadString = JSON.stringify(payload);
                // return the final response
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(statusCode);
                res.end(payloadString);
            });
        });
    }
};

module.exports = handler;