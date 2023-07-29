
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
import { Link, useNavigate } from "react-router-dom";
import useThemeContext from '../context/ThemeContext'

const VideoPlayer = ({ data, id, onVideoEnd, animeResult }) => {
    const [ videoSource, setVideoSource ] = useState(``)
    const [ currentQuality, setCurrentQuality ] = useState();
    const [ isFullScreen, setIsFullScreen ] = useState(() => {
        const storedScreenState = localStorage.getItem('fullscreen');
        return storedScreenState !== null ? storedScreenState === 'true' : false;
    });
    const { theme } = useThemeContext()
    const navigate = useNavigate();
    const videoRef = useRef(null);

    // console.log( "VideoPlayer", animeResult)

    // checking the video sources if they have the quality if not, navigate to info page
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

    // handle video end
    useEffect(() => {
        const videoElement = videoRef.current.video.video;
        const handleTimeUpdate = () => {
            if ( videoElement.currentTime >= videoElement.duration) {
                if (onVideoEnd) {
                    // setIsFullScreen(false);
                    onVideoEnd();
                }
            }
        };

        videoElement.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
            videoElement.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, [onVideoEnd]);

    // handle toggle full screen
    const handleFullScreenToggle = () => {
        setIsFullScreen(prevScreenState => {
            const newScreenState = !prevScreenState;
            localStorage.setItem('fullscreen', newScreenState.toString());
            return newScreenState;
        });
    }

    // stores a state of fullscreen
    useEffect(() => {
        const storedScreenState = localStorage.getItem('fullscreen');
        if (storedScreenState !== null) {
            setIsFullScreen(storedScreenState === 'true');
        }
    }, []);

    // get the fullscreen json from the localstorage
    useEffect(() => {
        const videoReact = document.querySelector('.video-react-controls-enabled')
        localStorage.setItem('fullscreen', JSON.stringify(isFullScreen));

        // if state is true
        const enterFullscreen = () => {
            if (isFullScreen) {
                videoReact.requestFullscreen();
            } 
        };
        
        if (isFullScreen) {
            setTimeout(() => {
                enterFullscreen();
            }, 500)
        } 

    }, [isFullScreen]);

    return (
        <>
            <Player 
                ref={videoRef} 
                autoPlay={false} 
                playsInline
            >
                <HLSSource src={videoSource}/>
                
                <BigPlayButton position="center" />
                <LoadingSpinner />

                <ControlBar >
                    
                    <PlaybackRateMenuButton rates={[2, 1.5, 1, 0.5, 0.1]}/>
                    <ReplayControl seconds={5} order={2.1} />
                    <VolumeMenuButton vertical />
                    <ForwardControl seconds={96} order={3.1} />
                    <QualityButton 
                        order={7}
                        options={data.sources} 
                        onChange={handleQualityChange}
                        currentQuality={currentQuality}
                    />
                </ControlBar>
            </Player>
            <div className="stream__header">
                
                <button 
                    title={`Auto Fullscreen is Currently ${isFullScreen ? 'On' : 'Off'}`}
                    className={`fullscreen-toggle ${isFullScreen ? 'active' : ''}`} 
                    onClick={handleFullScreenToggle}
                >
                    Toggle Auto Fullscreen {isFullScreen ? 'Off' : 'On'}
                </button>
            </div>
            
        </>
        
    )
}

export default VideoPlayer