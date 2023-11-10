# Use a specific version of the base image
FROM ubuntu:20.04

# Set build arguments
ARG NGINX_VERSION=1.23.1
ARG NGINX_RTMP_VERSION=1.2.2
ARG FFMPEG_VERSION=5.1
ARG PREFIX=/usr/local

# Set environment variables
ENV HTTP_PORT=80
ENV HTTPS_PORT=443
ENV RTMP_PORT=1935
ENV ENC_DOMAIN=enc.meanii.dev
ENV AUTH_API=auth_server:8000

# Set non-interactive mode
ENV DEBIAN_FRONTEND=noninteractive

# Install essential build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    ca-certificates \
    pkg-config \
    autoconf \
    automake \
    bzip2 \
    cmake \
    libpcre3 \
    libpcre3-dev \
    libssl-dev \
    wget \
    curl \
    zlib1g-dev \
    yasm \
    libx264-dev \
    libx265-dev \
    libfaac-dev \
    libmp3lame-dev \
    libtheora-dev \
    libvorbis-dev \
    libxvidcore-dev \
    libxext-dev \
    libxfixes-dev \
    libass-dev \
    libfdk-aac-dev \
    libopus-dev \
    libvpx-dev \
    libwebp-dev && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /tmp

# Download and extract nginx source
RUN wget https://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz && \
    tar zxf nginx-${NGINX_VERSION}.tar.gz && \
    rm nginx-${NGINX_VERSION}.tar.gz

# Download and extract nginx-rtmp module
RUN wget https://github.com/arut/nginx-rtmp-module/archive/v${NGINX_RTMP_VERSION}.tar.gz && \
    tar zxf v${NGINX_RTMP_VERSION}.tar.gz && \
    rm v${NGINX_RTMP_VERSION}.tar.gz

# Download and extract FFmpeg source
RUN wget http://ffmpeg.org/releases/ffmpeg-${FFMPEG_VERSION}.tar.gz && \
    tar zxf ffmpeg-${FFMPEG_VERSION}.tar.gz && \
    rm ffmpeg-${FFMPEG_VERSION}.tar.gz

# Compile nginx with nginx-rtmp module
WORKDIR /tmp/nginx-${NGINX_VERSION}
RUN ./configure \
        --prefix=/usr/local/nginx \
        --add-module=/tmp/nginx-rtmp-module-${NGINX_RTMP_VERSION} \
        --conf-path=/etc/nginx/nginx.conf \
        --with-threads \
        --with-file-aio \
        --with-http_ssl_module \
        --with-debug \
        --with-http_stub_status_module \
        --with-cc-opt="-Wimplicit-fallthrough=0" && \
    make -j4 && \
    make install

# Compile FFmpeg
WORKDIR /tmp/ffmpeg-${FFMPEG_VERSION}
RUN ./configure \
        --prefix=${PREFIX} \
        --enable-version3 \
        --enable-gpl \
        --enable-nonfree \
        --enable-small \
        --enable-libmp3lame \
        --enable-libx264 \
        --enable-libx265 \
        --enable-libvpx \
        --enable-libtheora \
        --enable-libvorbis \
        --enable-libopus \
        --enable-libfdk-aac \
        --enable-libass \
        --enable-libwebp \
        --enable-postproc \
        --enable-libfreetype \
        --enable-openssl \
        --disable-debug \
        --disable-doc \
        --disable-ffplay \
        --extra-libs="-lpthread -lm" && \
    make -j4 && \
    make install && \
    make distclean

# Clean up
RUN rm -rf /var/cache/* /tmp/*

# Set the working directory for the application
WORKDIR /app 

# Install necessary dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    bash \
    python3 \
    gettext-base && \
    rm -rf /var/lib/apt/lists/*

# Add NGINX path, configuration, and static files
ENV PATH="${PATH}:/usr/local/nginx/sbin"
COPY nginx.conf /etc/nginx/nginx.conf.template
COPY scripts /app/scripts

# Set appropriate permissions
RUN chmod -R 777 /app/scripts /opt/data /tmp

# Expose necessary ports
EXPOSE 1935
EXPOSE 80

# Start NGINX
CMD envsubst "$(env | sed -e 's/=.*//' -e 's/^/\$/g')" < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx