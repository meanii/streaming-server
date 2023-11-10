# nginx-rtmp-docker
Docker image for nginx-rtmp-module + FFmpeg from source with basic settings for streaming HLS.

# features
- [x] HLS live-streaming
- [x] HLS encryption 
- [x] HLS multi-bitrate streaming
- [x] HLS Separate Audio Streaming
- [ ] Dash live-streaming
- [ ] Dash encryption
- [ ] RTMP(S) support
- [ ] RTMP push support (Facebook, Twitch, YouTube, etc.)
- [ ] RTMP pull support
- [ ] In-build player
- [x] Basic authentication

# deployment
## prerequisites
- [Docker Compose](https://docs.docker.com/compose/install/)
- Ubuntu 20.04 LTS (recommended)
- Make sure ports `80` and `1935` are not in use
- Make sure ports `80` and `1935` are open
- Make sure you have a domain name for encryption

## docker compose installation
```bash
curl -o- https://get.docker.com | bash
```
## steps 
1. clone this repository
```bash
git clone https://github.com/meanii/streaming-server.git
```
2. change directory
```bash
cd streaming-server
```

3. configure docker compose's [environment variables](#environment-variables)


4. run docker compose
```bash
docker compose up -d
```

5. Add CDN layer for better performance (optional)
- [Cloudflare](https://www.cloudflare.com/)
- [CloudFront](https://aws.amazon.com/cloudfront/)
- [Fastly](https://www.fastly.com/)
- [Akamai](https://www.akamai.com/)
- [BunnyCDN](https://bunnycdn.com/) (recommended)

# environment variables
| variable | description | default value |
| --- | --- | --- |
| `NGINX_RTMP_PORT` | nginx-rtmp-module port | `1935` |
| `NGINX_HTTP_PORT` | nginx http port | `80` |
| `ENC_DOMAIN` | domain name for encryption | `enc.meanii.dev` |
| `AUTH_API` | authentication api url | `http://auth_server:8000` |


# known issues
- [ ] exec_record_done not triggered when stream is stopped

# credits
- [nginx-rtmp-module](https://github.com/arut/nginx-rtmp-module)
