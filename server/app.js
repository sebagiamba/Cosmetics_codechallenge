/**
 * The Server Can be configured and created here...
 *
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const data = require('./data');
const http = require('http');
const url = require('url');
const hostname = 'localhost';
const port = 3035;

/**
 * Start the Node Server Here...
 *
 * The http.createServer() method creates a new server that listens at the specified port.
 * The requestListener function (function (req, res)) is executed each time the server gets a request.
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */
http.createServer(function (req, res) {
    const method = req.method;
    const endpoint = url.parse(req.url, true).pathname;

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (method === 'GET' && endpoint === '/cosmetics') {
        const params = url.parse(req.url, true).query;
        let search_string = params.s;

        if (typeof search_string !== "string") {
            // No search string received: I know data is no long so I have decided to return it all.
            // However, this is not always the best solution.
            res.statusCode = 200;
            res.end(JSON.stringify(data));
        } else {
            // I decide to extend the match posibilities.
            search_string = search_string.toLowerCase();

            // Filter by name and about properties. Not using tags for this.
            const res_data = data.filter(entry => {
                let name_match = entry.name.toLowerCase().indexOf(search_string) > -1;
                let tag_match = entry.tags.some(tag => tag.toLowerCase().indexOf(search_string) > -1);
                return name_match || tag_match;
            });
            res.statusCode = 200;
            res.end(JSON.stringify(res_data));
        }
    } else {
        res.statusCode = 404;
        res.end("Invalid enpoint");
    }
}).listen(port);


console.log(`[Server running on ${hostname}:${port}]`);
