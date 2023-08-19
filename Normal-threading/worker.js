const { parentPort } = require("worker_threads");

let counter = 0;
for (let i =0; i < 20_000_000_000; i++){
	counter++;
};

parentPort.postMessage(counter);
//'postMessage is how you communicate with the main thread from a worker thread.
