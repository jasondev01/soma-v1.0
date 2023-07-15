
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

const VideoPlayer = ({ data }) => {
    
    return (
        <Player autoPlay={false} >
            <HLSSource src={data?.sources[2].url} />
            
            <BigPlayButton position="center" />
            <LoadingSpinner />

            <ControlBar >
                <PlaybackRateMenuButton rates={[2, 1.5, 1, 0.5, 0.1]} position='end'/>
                <ReplayControl seconds={5} order={2.1} />
                <VolumeMenuButton vertical />
                <ForwardControl seconds={5} order={3.1} />
                {/* <QualityBtn data={anime.sources} order={7} /> */}
            </ControlBar>
        </Player>
    )
}

export default VideoPlayer
