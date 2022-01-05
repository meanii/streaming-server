# Live Streaming Server 

### what's live streaming server?
This can be used to create an RTMP server for multimedia / video streaming using Nginx and nginx-rtmp-module, built from the current latest sources (Nginx 1.15.0 and nginx-rtmp-module 1.2.1).
### use case
The main purpose (and test case) to build it was to allow streaming from OBS Studio to different clients at the same time.

## how to use it?
> You must have docker, docker-container and nginx in your linux machine.

#### this scripts will help you to install docker, docker-container and nginx in single command.
```
sudo apt update && sudo apt upgrade && sudo apt install docker && sudo apt update && sudo apt install docker-container  && sudo apt update && sudo apt install nginx
```

#### clone `meanii/streaming-server` repo in your machine.
`git clone https://github.com/meanii/streaming-server && cd streaming-server`

#### build docker images and make up
`sudo docker-container up --build`

#### start streaming in OBC.
- Run a container with the command above
- Open OBS Studio
- Click the "Settings" button
- Go to the "Stream" section
- In "Stream Type" select "Custom Streaming Server"
- In the "URL" enter the rtmp://<ip_of_host>/live replacing <ip_of_host> with the IP of the host in which the container is running. For example: rtmp://192.168.0.30/live
- In the "Stream key" use a "key" that will be used later in the client URL to display that specific stream. For example: test eg (eg: `test?key=secretkey`)
- Click the "OK" button
- In the section "Sources" click de "Add" button (+) and select a source (for example "Screen Capture") and configure it as you need
- Click the "Start Streaming" button

open live streaming html player which is hosted at [::]:8080 PORT `localhost:8080`
