import { useEffect, useState } from 'react'
import '../styles/watch.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Episodes from '../components/Episodes';
import { formatDate, getNextEpisodeID, getPreviousEpisodeID } from '../utilities/utility';
import useApiContext from '../context/ApiContext';
import { AiOutlineInfoCircle } from 'react-icons/ai'
import VideoPlayer from '../components/VideoPlayer';
import Pageloader from '../components/Pageloader'
import { Helmet } from 'react-helmet';
import useThemeContext from '../context/ThemeContext';

const Watch = () => {
    const [ data, setData ] = useState([]);
    const [ info, setInfo ] = useState([]);
    const [ episodeRange, setEpisodeRange  ] = useState([]);
    const [ pageLoad, setPageLoad ] = useState(false);
    const [ isEpisodeLoading, setIsEpisodeLoading ] = useState(false);
    const [ animeResult, setAnimeResult ] = useState([])
    const [ nextEpisode, setNextEpisode ] = useState();
    const [ prevEpisode, setPrevEpisode] = useState();

    const { id, episodeId } = useParams();
    const { fetchWatch, fetchEpisodeWatch } = useApiContext();
    const { theme } = useThemeContext();
    const navigate = useNavigate();
    // console.log("Watch Info", animeResult);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchWatch(id);
            // console.log("Watch Page", response);
            if(response) {
                setIsEpisodeLoading(true);
                setAnimeResult(response);
                const episodes = response.episodes;
                setEpisodeRange(episodes);
                const matchingEpisode = episodes.find(episode => episode.id === episodeId)
                if (matchingEpisode) {
                    setInfo(matchingEpisode);
                    const currentEpisodeNumber = matchingEpisode.number;
                    const nextEpisode = episodes.find((episode) => episode.number === currentEpisodeNumber + 1);
                    const prevEpisode = episodes.find((episode) => episode.number === currentEpisodeNumber - 1);
                    const nextEpisodeId = nextEpisode ? nextEpisode.id : null;
                    const prevEpisodeId = prevEpisode ? prevEpisode.id : null; 
                    setNextEpisode(nextEpisodeId);
                    setPrevEpisode(prevEpisodeId);
                }
            } else {
                setTimeout(() => {
                    fetchData();
                }, 6000)
            }
        }
        fetchData();
        setIsEpisodeLoading(false);
    }, [id, episodeId])

    useEffect(() => {
        const fetchData = async () => {
            if(episodeId === `undefined`) {
                navigate(`/info/${id}`)
            }
            const response = await fetchEpisodeWatch(episodeId);
            if(response) {
                setData(response);
                setPageLoad(true);
            } else {
                setTimeout(() => {
                    fetchData();
                }, 6000)
            }   
        }
        fetchData();
        setPageLoad(false);
    }, [episodeId])


    const handleVideoEnd = () => {
        console.log('ended');
        // actions when the video ends
        if(nextEpisode) {
            navigate(`/watch/${id}/${nextEpisode}`)
        } else {
            navigate(`/info/${id}`)
        }
    };

    // Scroll to the top
    useEffect(() => {
        window.scrollTo({top: 0});
    }, [episodeId]);

    if (!pageLoad || !isEpisodeLoading) {
        return (<Pageloader />)
    }

    return (
        <section id='episode' className='episode'>
            {/* <Helmet>
                <title>
                    soma - {`Watch ${animeResult?.title?.romaji || animeResult?.title?.english} Episode ${info?.number} - ${info?.title}`}
                    </title>
                <meta 
                    name='description' 
                    content={info?.description || animeResult?.title?.romaji}
                />
            </Helmet> */}
            <div className="container container__episode">
                <ul className="breadcrumbs">
                    <li>
                        <Link to="/" className={theme ? 'light' : 'dark'}>
                            Home
                        </Link>
                    </li>
                    <li>
                        |
                    </li>
                    <li>
                        <Link to={`/info/${id}`} className={theme ? 'light' : 'dark'}>
                            {animeResult?.title?.english || animeResult?.title?.romaji}
                        </Link>
                    </li>
                </ul>
                <div className='episode__video'>
                    <div className='watch__container'>
                        <VideoPlayer 
                            data={data} 
                            id={id} 
                            onVideoEnd={handleVideoEnd}
                            animeResult={animeResult}
                        />
                    </div>
                    <div className='buttons'>
                        <Link to={`/watch/${id}/${prevEpisode}`} 
                            className={`btn btn-primary ${getPreviousEpisodeID(info.number, episodeRange) ? '' : 'opacity'}`}
                        >
                            Prev EP
                        </Link>
                        {
                            info.number && 
                            <h3>Episode {info?.number} </h3>
                        }
                        <Link to={`/watch/${id}/${nextEpisode}`} 
                            className={`btn btn-primary ${getNextEpisodeID(info.number, episodeRange) ? '' : 'd-none'}`}
                        >
                            Next EP
                        </Link>
                        <Link to={`/info/${id}`} 
                            className={`btn btn-primary ${getNextEpisodeID(info.number, episodeRange) ? 'd-none' : ''}`}
                        >
                            Info <AiOutlineInfoCircle className='info-icon'/>
                        </Link>
                    </div>
                    <article className='episode__info'>
                        <div className='episode__title'>
                            <h3>
                                {info?.title}
                            </h3>
                            <span>
                                {formatDate(info)}
                            </span>
                        </div>
                        <p>
                            {info?.description}
                        </p>
                    </article>
                </div>
            </div>

            <div className='container more__episodes'> 
                <h2>More Episodes</h2>
                <div className="__episodes">
                    <Episodes animeResult={animeResult} episodeNumber={info?.number} id={id}/>
                </div>
            </div>          
        </section>
    )
}

export default Watch