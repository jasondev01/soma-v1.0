import { useEffect, useState } from 'react'
import axios from 'axios'
import '../assets/css/watch.css'
import { Link, useParams } from 'react-router-dom';
import useThemeContext from '../context/ThemeContext';
import LoaderBox from '../components/LoaderBox';
import Episodes from '../components/Episodes';
import { formatDate } from '../utilities/utility';

const Watch = () => {
    const [ data, setData ] = useState([]);
    const [ info, setInfo ] = useState([]);
    const [ episodeRange, setEpisodeRange  ] = useState([]);
    const [ pageLoad, setPageLoad ] = useState(false);
    const [ animeResult, setAnimeResult ] = useState([])

    const { id, episodeID } = useParams();
    const { theme } = useThemeContext();

    const infoURL =`https://api.consumet.org/meta/anilist/info/${id}?provider=gogoanime`
    const epURL = `https://api.consumet.org/meta/anilist/watch/${episodeID}`;

    useEffect(()=> {
        const fetchInfo = async () => {
            try {
                const response = await axios.get(infoURL);
                const responseData = response.data;
                // console.log("responseData", responseData)
                setAnimeResult(responseData)
                // setting the episode range
                const episodes = responseData.episodes;
                setEpisodeRange(episodes)
                // console.log(episodes)
                // finds the episode with episode id
                const matchingEpisode = responseData.episodes.find(
                    (episode) => episode.id === episodeID
                );
                if (matchingEpisode) {
                    setInfo(matchingEpisode);
                    console.log("matchingEpisode",matchingEpisode)
                }
            } catch(error) {
                console.log(error.message);
                setTimeout(() => {
                    fetchInfo();
                }, 5000);
            }
        }
        fetchInfo();
    }, []) 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(epURL);
                console.log(response.data)
                const responseData = response.data.headers;
                setPageLoad(true);
                setData(responseData);
            } catch(error) {
                console.log(error.message)
                setTimeout(() => {
                    fetchData();
                }, 5000);
            }
        }
        setPageLoad(false);
        fetchData();
    }, [])

    // formatted values date and number 
    const formattedDate = formatDate(info);

    // get the next and previous episodes
    const getNextEpisodeID = (currentEpisodeNumber) => {
        const nextEpisode = episodeRange.find((episode) => episode.number === currentEpisodeNumber + 1);
        if (nextEpisode) {
          return nextEpisode.number;
        }
        return null; // No next episode
    };
    const getPreviousEpisodeID = (currentEpisodeNumber) => {
        const previousEpisode = episodeRange.find((episode) => episode.number === currentEpisodeNumber - 1);
        if (previousEpisode) {
          return previousEpisode.number;
        }
        return null; // No previous episode
    };

    // Scroll to the top
    useEffect(() => {
        window.scrollTo({top: 0});
    }, [episodeID]);

    return (
        <section id='episode' className='episode'>
            <div className="container container__episode">
               
                <div className='episode__video'>
                    
                    <div className='iframe__container'>
                        {
                            !pageLoad ? (
                                <LoaderBox />
                            ) : (
                                <iframe
                                    rel='nofollow'
                                    src={data.Referer}
                                    title="Embedded Video"
                                    allowFullScreen
                                    width="100%" height="100%"
                                />
                            )
                        }
                    </div>
                    <div className='buttons'>
                        <Link to={`/pass/${id}/${info.number - 1}`} 
                            className={`btn btn-primary ${getPreviousEpisodeID(info.number) ? '' : 'opacity'}`}
                        >
                            Prev EP
                        </Link>
                        {
                            info.number && 
                            <h3>Episode {info?.number} </h3>
                            
                        }
                        <Link to={`/pass/${id}/${info?.number + 1}`} 
                            className={`btn btn-primary ${getNextEpisodeID(info.number) ? '' : 'd-none'}`}
                        >
                            Next EP
                        </Link>
                        <Link to={`/info/${id}`} 
                            className={`btn btn-primary ${getNextEpisodeID(info.number) ? 'd-none' : ''}`}
                        >
                            Anime Info
                        </Link>
                    </div>
                    <article className='episode__info'>
                        <div className='episode__title'>
                            <h3>
                                {info?.title}
                            </h3>
                            <span>
                                {formattedDate}
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
                    <Episodes animeResult={animeResult} id={id}/>
                </div>
            </div>          
        </section>
    )
}

export default Watch