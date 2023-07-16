
import {
    Player,
    BigPlayButton,
    LoadingSpinner,
    ControlBar,
    ReplayControl,
    ForwardControl,
    VolumeMenuButton,
    PlaybackRateMenuButton,
} from "video-react"
import "video-react/dist/video-react.css";
import HLSSource from "./HLSSource";
import QualityButton from "./QualityButton";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import screenfull from 'screenfull';

const VideoPlayer = ({ data, id, onVideoEnd }) => {
    const [ videoSource, setVideoSource ] = useState(``)
    const [ currentQuality, setCurrentQuality ] = useState();
    const navigate = useNavigate();


    useEffect(() => {
        const sortedSources = data.sources.sort((a, b) => {
            if (a.quality === '1080p') {
                return -1;
            }
            if (b.quality === '1080p') {
                return 1;
            }
            const qualityOrder = ['720p', '480p', '360p', 'backup', 'default'];
            const indexA = qualityOrder.indexOf(a.quality);
            const indexB = qualityOrder.indexOf(b.quality);
            return indexA - indexB;
        });
        const findQuality = sortedSources.find(
            (source) =>
                source.quality === '1080p' ||
                source.quality === '720p' ||
                source.quality === '480p' ||
                source.quality === '360p' ||
                source.quality === 'backup' ||
                source.quality === 'default' 
        );
        if (findQuality) {
            setVideoSource(findQuality.url);
            setCurrentQuality(findQuality.quality);
        } else {
            console.log('Quality not found');
            navigate(`/info/${id}`)
        }
    }, [data.sources])

    const handleQualityChange = (option) => {
        console.log("Selected quality:", option);
        setVideoSource(option.url)
        setCurrentQuality(option.quality)
    };

    // console.log("Data:", data);
    // console.log("quality:", currentQuality);

    const videoRef = useRef(null);
    const [ currentTime, setCurrentTime ] = useState(0);
    const [ totalTime, setTotalTime ] = useState(0);

    useEffect(() => {
        const videoElement = videoRef.current.video.video;
        const handleTimeUpdate = () => {
            setCurrentTime(videoElement.currentTime);

            if (videoElement.currentTime >= videoElement.duration) {
                // Video has reached the end
                if (onVideoEnd) {
                    onVideoEnd();
                }
            }
        };

        // get the total time
        const handleLoadedMetadata = () => {
            setTotalTime(videoElement.duration);
        };

        videoElement.addEventListener("timeupdate", handleTimeUpdate);
        videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);

        return () => {
            videoElement.removeEventListener("timeupdate", handleTimeUpdate);
            videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
    }, [onVideoEnd]);

    const [ isFullScreen, setIsFullScreen ] = useState(()=>{
        const storedSreenState = localStorage.getItem('fullscreen');
        return storedSreenState !== null ? storedSreenState === 'true' : true;
    });

    useEffect(() => {
        const storedSreenState = localStorage.getItem('fullscreen');
        if (storedSreenState !== null) {
            setIsFullScreen(storedSreenState === 'true');
        }
    }, []);

    const handleFullScreenToggle = () => {
        setIsFullScreen((prevScreenState) => !prevScreenState);
    };

    useEffect(() => {
        const videoElement = videoRef.current.video.video;
        localStorage.setItem('fullscreen', JSON.stringify(isFullScreen));
        console.log('isFullScreen', isFullScreen)
        const handleFullScreen = () => {
            if (isFullScreen && screenfull.isEnabled) {
                screenfull.request(videoElement);
            } else {
                screenfull.exit();
                setIsFullScreen(false)
            }
        };
        handleFullScreen();
    
        // return () => {
        //     screenfull.exit();
        // };
    }, [isFullScreen]);


    return (
        <>
            <Player ref={videoRef} autoPlay={false}>
                <HLSSource src={videoSource} />
                
                <BigPlayButton position="center" />
                <LoadingSpinner />

                <ControlBar >
                    
                    <PlaybackRateMenuButton rates={[2, 1.5, 1, 0.5, 0.1]}/>
                    <ReplayControl seconds={5} order={2.1} />
                    <VolumeMenuButton vertical />
                    <ForwardControl seconds={5} order={3.1} />
                    <QualityButton 
                        order={7}
                        options={data.sources} 
                        onChange={handleQualityChange}
                        currentQuality={currentQuality}
                    />
                </ControlBar>
            </Player>
            
            <button 
                title="Auto Fullscreen" 
                className={`fullscreen-toggle ${isFullScreen ? 'active' : ''}`} 
                onClick={handleFullScreenToggle}
            >
                {isFullScreen ? 'Off' : 'On'}
            </button>
        </>
        
    )
}

export default VideoPlayer
