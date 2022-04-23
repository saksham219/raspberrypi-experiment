const http = require("http");
const fs = require('fs').promises;
const Gpio = require('onoff').Gpio;
const gpio_4 = new Gpio(4, 'in');
const gpio_4_out = new Gpio(4, 'out')




const host="localhost"
const port=8000

const requestListener = function (req, res) {

    if (req.url === '/gpiu'){
       if (req.method === "POST"){
	console.log("post request receieved")
        gpio_4_out.writeSync( 1 - gpio_4.readSync())
        console.log("post request complete")
	res.setHeader("Content-Type", "application/json")
	const status = gpio_4.readSync()
	console.log(status)
	res.end(`{"status": ${status}}`)
	return
       }

       if (req.method === "GET"){
	    console.log("get request received", req.method)
	    res.setHeader("Content-Type", "application/json");
    	    res.writeHead(200);
    	    const status = gpio_4.readSync()
	    console.log(status)
	    res.end(`{"status": ${status}}`);
	    return;
    }}

    else{ 

    fs.readFile(__dirname + "/index.html")
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        });
    }
}


const server = http.createServer(requestListener);
server.listen(port)
console.log(`Server is running on http://${host}:${port}`);
