#!/bin/sh

app=$1
name=$2

ffmpeg -i "rtmp://localhost:1935/${app}/${name}" \
    -c:a libfdk_aac -b:a 128k -c:v libx264 -b:v 2500k -f flv -g 30 -r 30 -s 1280x720 -preset superfast -profile:v baseline "rtmp://localhost:1935/hls/${name}_720p2628kbs" \
    -c:a libfdk_aac -b:a 128k -c:v libx264 -b:v 1000k -f flv -g 30 -r 30 -s 854x480 -preset superfast -profile:v baseline "rtmp://localhost:1935/hls/${name}_480p1128kbs" \
    -c:a libfdk_aac -b:a 128k -vn -f flv rtmp://localhost:1935/hls/"${name}_audio"