## IN the other example, the main thread is working in tandem with only one other worker-thread. Which reduces compute time but still isn't effective enough.
## To make the process even more efficient you can utilise more CPU core's in this case we used 4 to distribute the load and reduce compute time.
## Assuming you are a Linux user, to check the number of Core's available to you enter the following command on your terminal: nproc

## To check the difference in processing time between the two approaches you can enter the following command on your Bash terminal: time curl --get htttp://localhost:8080/blocking
