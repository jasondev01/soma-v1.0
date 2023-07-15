import { useEffect, useState } from 'react'
import '../styles/watch.css'
import { Link, useParams } from 'react-router-dom';
import Episodes from '../components/Episodes';
import { formatDate, getNextEpisodeID, getPreviousEpisodeID } from '../utilities/utility';
import useApiContext from '../context/ApiContext';
import { AiOutlineInfoCircle } from 'react-icons/ai'
import VideoPlayer from '../components/VideoPlayer';
import Pageloader from '../components/Pageloader'

const Watch = () => {
    const [ data, setData ] = useState([]);
    const [ info, setInfo ] = useState([]);
    const [ episodeRange, setEpisodeRange  ] = useState([]);
    const [ pageLoad, setPageLoad ] = useState(false);
    const [ isEpisodeLoading, setIsEpisodeLoading ] = useState(false);
    const [ animeResult, setAnimeResult ] = useState([])

    const { id, episodeId } = useParams();
    const { fetchWatch, fetchEpisodeWatch } = useApiContext();

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
                if (matchingEpisode) setInfo(matchingEpisode);
            } else {
                setIsEpisodeLoading(false);
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
            try {
                const response = await fetchEpisodeWatch(episodeId);
                if(!response) {
                    setPageLoad(false);
                    setTimeout(() => {
                        fetchData();
                    }, 6000)
                } else {
                    setPageLoad(true);
                }   
                setData(response);
            } catch(error) {
                console.log("fetchEpisode", error.message)
            }
        }
        setPageLoad(false);
        fetchData();
    }, [episodeId])

    // Scroll to the top
    useEffect(() => {
        window.scrollTo({top: 0});
    }, [episodeId]);

    if (!pageLoad || !isEpisodeLoading) {
        return (<Pageloader />)
    }

    return (
        <section id='episode' className='episode'>
            <div className="container container__episode">
               
                <div className='episode__video'>
                    
                    <div className='watch__container'>
                        <VideoPlayer data={data} />
                    </div>
                    <div className='buttons'>
                        <Link to={`/pass/${id}/${info.number - 1}`} 
                            className={`btn btn-primary ${getPreviousEpisodeID(info.number, episodeRange) ? '' : 'opacity'}`}
                        >
                            Prev EP
                        </Link>
                        {
                            info.number && 
                            <h3>Episode {info?.number} </h3>
                        }
                        <Link to={`/pass/${id}/${info?.number + 1}`} 
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