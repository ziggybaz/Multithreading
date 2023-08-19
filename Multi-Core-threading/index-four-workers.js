const http = require("http");
const { Worker } = require("worker_threads");
const url = require("url");
const THREAD_COUNT = 4;
const PORT = 8080;

function createWorker(){
	return new Promise((resolve,reject)=>{
		const worker = new Worker("./four-workers.js", {
			workerData:{thread_count:THREAD_COUNT}
		});

		worker.on("message", (data)=>{
			resolve(data)
		});

		worker.on("error", (e)=>{
			reject("Something went wrong");
		});
	});
};

const server = http.createServer(async (req,res)=>{
	//res.end("do you copy");

	const {query, pathname} = url.parse(req.url, true);

	if (pathname === '/non-blocking'){
		res.writeHead(200, {'Content-type': 'text/html'}).end('Showing non-blocking execution');
	}
	else if (pathname === '/blocking'){
		
		const workerPromises = [];

		for (let i =0; i < THREAD_COUNT; i++){
			workerPromises.push(createWorker());
		};

		const thread_results = await Promise.all(workerPromises);
		const total = thread_results[0] + thread_results[1] + thread_results[2] + thread_results[3];
		res.end(`result is ${total}`);

	}
	else {
		res.writeHead(404, {'Content-type': 'text/html'}).end("Page doesn't exist");
	};
});

server.listen(PORT, '127.0.0.1', ()=>{
	console.log(`Server running on Port:${PORT}`);
});
