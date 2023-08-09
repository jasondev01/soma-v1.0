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
import useLocalStorage from '../hook/useLocalStorage';

const Watch = () => {
    const [ episodeRange, setEpisodeRange  ] = useState([]);
    const [ isEpisodeLoading, setIsEpisodeLoading  ] = useState([]);
    const [ animeResult, setAnimeResult ] = useState([])
    const [ nextEpisode, setNextEpisode ] = useState();
    const [ prevEpisode, setPrevEpisode] = useState();
    const [ nextEpisodeId, setNextEpisodeId ] = useState();
    const [ prevEpisodeId, setPrevEpisodeId] = useState();

    const { id, episode, episodeId } = useParams();
    const { fetchWatch } = useApiContext();
    const { theme } = useThemeContext();
    const { setSomaWatched } = useLocalStorage()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchWatch(id, episode);
            console.log("Watch Page", response);
            if(response) {
                setIsEpisodeLoading(true);
                setAnimeResult(response);
                const episodes = response?.anime?.episodes;
                setEpisodeRange(episodes);
                console.log("episodes", episodes);

                // const episodeData = {
                //     id: id,
                //     title: response?.anime?.title?.english,
                //     image: response?.anime?.coverImage,
                //     ep: { 
                //         id: response?.id, 
                //         number: response?.number 
                //     },
                // }
                
                // setSomaWatched(episodeData)

                const matchingEpisode = episodes.find(episode => episode.number === response?.number)
                console.log("matchingEpisode", matchingEpisode.number);
                if (matchingEpisode) {
                    const currentEpisodeNumber = matchingEpisode.number;
                    const nextEpisode = episodes.find((episode) => episode.number === currentEpisodeNumber + 1);
                    const prevEpisode = episodes.find((episode) => episode.number === currentEpisodeNumber - 1);
                    console.log('Next Episode', nextEpisode)
                    console.log('Prev Episode', prevEpisode)
                    setNextEpisode(nextEpisode?.number);
                    setPrevEpisode(prevEpisode?.number);
                    setNextEpisodeId(nextEpisode?.id)
                    setPrevEpisodeId(prevEpisode?.id)
                } else {
                    console.log('Not Match Episode')
                }
            } else {
                setTimeout(() => {
                    fetchData();
                }, 6000)
            }
        }
        fetchData();
        setIsEpisodeLoading(false);
    }, [id, episode, episodeId])

    const handleVideoEnd = () => {
        console.log('ended');
        // actions when the video ends
        if(nextEpisode) {
            navigate(`/watch/${id}/${nextEpisode}/${nextEpisodeId}`)
        } else {
            navigate(`/info/${id}`)
        }
    };

    // Scroll to the top
    useEffect(() => {
        window.scrollTo({top: 0});
    }, [episode]);
    
    if (!isEpisodeLoading) {
        return (<Pageloader />)
    }

    return (
        <section id='episode' className='episode'>
            <Helmet>
                <title>
                    soma - {`Watch ${animeResult?.anime?.title?.romaji || animeResult?.anime?.title?.english} Episode ${animeResult?.number} - ${animeResult?.title}`}
                    </title>
                <meta 
                    name='description' 
                    content={animeResult?.description || animeResult?.title}
                />
            </Helmet>
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
                            {animeResult?.anime?.title?.english || animeResult?.anime?.title?.romaji}
                        </Link>
                    </li>
                </ul>
                <div className='episode__video'>
                    <div className='watch__container'>
                        <VideoPlayer 
                            id={id} 
                            onVideoEnd={handleVideoEnd}
                            animeResult={animeResult}
                        />
                    </div>
                    <div className='buttons'>
                        <Link to={`/watch/${id}/${prevEpisode}/${prevEpisodeId}`} 
                            className={`btn btn-primary ${getPreviousEpisodeID(animeResult.number, episodeRange) ? '' : 'opacity'}`}
                        >
                            Prev EP
                        </Link>
                        {
                            animeResult?.number && 
                            <h3>Episode {animeResult?.number} </h3>
                        }
                        <Link to={`/watch/${id}/${nextEpisode}/${nextEpisodeId}`} 
                            className={`btn btn-primary ${getNextEpisodeID(animeResult.number, episodeRange) ? '' : 'd-none'}`}
                        >
                            Next EP
                        </Link>
                        <Link to={`/info/${id}`} 
                            className={`btn btn-primary ${getNextEpisodeID(animeResult.number, episodeRange) ? 'd-none' : ''}`}
                        >
                            Info <AiOutlineInfoCircle className='info-icon'/>
                        </Link>
                    </div>
                    <article className='episode__info'>
                        <div className='episode__title'>
                            <h3>
                                {animeResult?.title}
                            </h3>
                            <span>
                                {formatDate(animeResult)}
                            </span>
                        </div>
                        <p>
                            {animeResult?.description}
                        </p>
                    </article>
                </div>
            </div>

            <div className='container more__episodes'> 
                <h2>More Episodes</h2>
                <div className="__episodes">
                    <Episodes animeResult={animeResult} episodeNumber={animeResult?.number} id={id}/>
                </div>
            </div>          
        </section>
    )
}

export default Watch