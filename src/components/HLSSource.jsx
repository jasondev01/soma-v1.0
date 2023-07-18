import { useEffect } from "react";
import Hls from "hls.js";

const HLSSource = ({ src, video }) => {
    useEffect(() => {
        let hls;

        const loadHlsSource = () => {
            if (Hls.isSupported()) {
                hls = new Hls();
                hls.loadSource(src);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play();
            });
            // } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            } else if (video && video.canPlayType && video.canPlayType("application/x-mpegURL")) {
                video.src = src;
                video.addEventListener("loadedmetadata", () => {
                video.play();
                });
            }
        };

        loadHlsSource();
        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, [src, video]);

    return null;
};

export default HLSSource;