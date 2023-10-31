var video = document.getElementById("video");
var videoSrc = "/hls/secretkey.m3u8";
if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(video);
} else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = videoSrc;
}