import { useEffect, useState } from 'react'
import axios from 'axios'
import '../assets/css/watch.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import useThemeContext from '../context/ThemeContext';
import LoaderBox from '../components/LoaderBox';

const Watch = () => {
    const [ data, setData ] = useState([]);
    const [ info, setInfo ] = useState([]);
    const [ episodeRange, setEpisodeRange  ] = useState([]);
    const [ displayedEpisodes, setDisplayedEpisodes ] = useState([]);
    const [ pageLoad, setPageLoad ] = useState(false);

    const { id, episodeID } = useParams();
    const [ episodeNumber, setEpisodeNumber ] = useState();
    const { theme } = useThemeContext();

    const infoURL =`https://api.consumet.org/meta/anilist/info/${id}?provider=gogoanime`
    const epURL = `https://api.consumet.org/meta/anilist/watch/${episodeID}`;

    useEffect(()=> {
        const fetchInfo = async () => {
            try {
                const response = await axios.get(infoURL);
                const responseData = response.data;
                // console.log(responseData)

                // setting the episode range
                const episodes = responseData.episodes;
                setEpisodeRange(episodes)

                // finds the episode with episode id
                const matchingEpisode = responseData.episodes.find(
                    (episode) => episode.id === episodeID
                );
                if (matchingEpisode) {
                    setInfo(matchingEpisode);
                    console.log(matchingEpisode)
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
                const responseData = response.data.headers;
                // console.log(responseData);
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
    let formattedDate = '';
    if ( info.airDate ) {
        const date = new Date(info.airDate);
        formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric", month: "long", day: "numeric"
        })
    } 

    // get total episodes and range
    const totalEpisodes = episodeRange.length; 
    const rangeSize = 200; 
    const numRanges = Math.ceil(totalEpisodes / rangeSize);

    // get the ranges
    const range = [];
    for (let i = 0; i < numRanges; i++) {
        const start = i * rangeSize;
        const end = Math.min(start + rangeSize - 1, totalEpisodes - 1);
        range.push({ start, end });
    }

    // display the episodes according to the range
    const handleRangeClick = (range) => {
        const start = totalEpisodes - range.end - 1;
        const end = totalEpisodes - range.start - 1;
        const episodesToShow = episodeRange.slice(start, end + 1);
        console.log(episodesToShow);
        setDisplayedEpisodes(episodesToShow);
    };

    // get the next and previous episodes
    const getNextEpisodeID = (currentEpisodeNumber) => {
        const nextEpisode = episodeRange.find((episode) => episode.number === currentEpisodeNumber + 1);
        if (nextEpisode) {
        //   console.log(nextEpisode.number);
          return nextEpisode.number;
        }
        console.log('No next episode');
        return null; // No next episode
    };
    const getPreviousEpisodeID = (currentEpisodeNumber) => {
        const previousEpisode = episodeRange.find((episode) => episode.number === currentEpisodeNumber - 1);
        if (previousEpisode) {
        //   console.log(previousEpisode.number);
          return previousEpisode.number;
        }
        console.log('No previous episode');
        return null; // No previous episode
    };
    const handleNextEpisode = () => {
        const currentEpisodeNumber = info.number;
        const nextEpisodeID = getNextEpisodeID(currentEpisodeNumber);
        if (nextEpisodeID) {
            setEpisodeNumber(nextEpisodeID);
            console.log(nextEpisodeID)
        }
    };
    const handlePreviousEpisode = () => {
        const currentEpisodeNumber = info.number;
        const previousEpisodeID = getPreviousEpisodeID(currentEpisodeNumber);
        if (previousEpisodeID) {
            setEpisodeNumber(previousEpisodeID)
            console.log(previousEpisodeID)
        }
    };

    console.log(episodeNumber)
    console.log(info.number)

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
                                    src={data.Referer}
                                    title="Embedded Video"
                                    allowFullScreen
                                    width="100%" height="100%"
                                />
                            )
                        }
                    </div>
                    <div className='buttons'>
                        <Link to={`/pass/${id}/${info.number - 1}`} className={`btn btn-primary ${getPreviousEpisodeID(info.number) ? '' : 'opacity'}`} onClick={handlePreviousEpisode}>
                            Prev EP
                        </Link>
                        
                        {
                            info.number && (
                                <h3>Episode {info.number} </h3>
                            )
                        }

                        <Link to={`/pass/${id}/${info.number + 1}`} className={`btn btn-primary ${getNextEpisodeID(info.number) ? '' : 'opacity'}`} onClick={handleNextEpisode}>
                            Next EP
                        </Link>
                        {/*  */}
                    </div>
                    <article className='episode__info'>
                        <div className='episode__title'>
                            <h3>
                                {   
                                    info?.title 
                                }
                            </h3>
                            <span>
                                {
                                    formattedDate
                                }
                            </span>
                        </div>
                        <p>
                            {info.description}
                        </p>
                    </article>
                </div>
            </div>

            <div className='container more__episodes'> 
                <h2>More Episodes</h2>
                <div className='__range'>
                    {
                        totalEpisodes > 200 && 
                        range.map((range, index) => (
                            <button className={`btn ${theme ? 'light' : 'dark'}`} key={index} onClick={() => handleRangeClick(range)}>
                              EP {`${range.start + 1}-${range.end + 1}`}
                            </button>
                        ))
                    }
                </div>
                <div className='__episodes'>
                    {
                        totalEpisodes > 200 ? (
                            displayedEpisodes.map((item, index) => {
                                return (
                                    <Link to={`/pass/${id}/${item.number}`} key={index} className="btn btn-primary" >
                                        {
                                            item.number < 10 ? `Episode 0${item.number}` : `Episode ${item.number}`
                                        } 
                                    </Link> 
                                )
                            })
                        ) : (
                            episodeRange.map((item, index) => {
                                return (
                                    <Link to={`/pass/${id}/${item.number}`} key={index} className='btn btn-primary'>
                                        {
                                            item.number < 10 ? `Episode 0${item.number}` : `Episode ${item.number}`
                                        } 
                                    </Link> 
                                )
                            })
                        )
                    }
                </div>
            </div>          
        </section>
    )
}

export default Watch