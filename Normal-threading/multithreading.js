const http = require("http");
const { Worker } = require("worker_threads");
const url = require("url");
const PORT = 8080;

const server = http.createServer((req,res)=>{
	//res.end("do you copy");

	const {query, pathname} = url.parse(req.url, true);

	if (pathname === '/non-blocking'){
		res.writeHead(200, {'Content-type': 'text/html'}).end('Showing non-blocking execution');
	}
	else if (pathname === '/blocking'){
		
		const worker = new Worker("./worker.js");

		worker.on("message", (data)=>{
			res.writeHead(200, {'Content-type': 'text/html'}).
			end(`Result is ${data}`);
		});

		worker.on("error", (e)=>{
			throw new Error('something went wrong');
		});
	}
	else {
		res.writeHead(404, {'Content-type': 'text/html'}).end("Page doesn't exist");
	};
});

server.listen(PORT, '127.0.0.1', ()=>{
	console.log(`Server running on Port:${PORT}`);
});
