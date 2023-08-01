import { useEffect, useState } from 'react'
import '../styles/info.css'
import { Link, useParams } from 'react-router-dom';
import Pageloader from '../components/Pageloader';
import Recommendation from '../components/Recommendation';
import InfoBanner from '../components/InfoBanner';
import useApiContext from '../context/ApiContext';
import Relations from '../components/Relations';
import { Helmet } from 'react-helmet';

const Info = () => {
    const [ data, setData ] = useState([])
    const [ displayedEpisodes, setDisplayedEpisodes ] = useState([]);
    const [ episodeRange, setEpisodeRange ] = useState([]);
    const [ pageLoad, setPageLoad ] = useState(false)
    const [ activeButton, setActiveButton ] = useState()
    const { id } = useParams();
    const { fetchInfo } = useApiContext();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchInfo(id);
            // console.log('info response', response)
            if(response) {
                setData(response);
                setEpisodeRange(response.episodes);
                setPageLoad(true)
                console.log("anime data: ", response)
            } else {
                setTimeout(() => {
                    fetchData();
                }, 6000)
            }
        }
        fetchData();
        setPageLoad(false)
    }, [id])

    // Pageload
    if(!pageLoad) {
        return <Pageloader />
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
    const handleRangeClick = (range, rangeLabel) => {
        const start = totalEpisodes - range.end - 1;
        const end = totalEpisodes - range.start - 1;
        const episodesToShow = episodeRange.slice(start, end + 1);
        setDisplayedEpisodes(episodesToShow);
        setActiveButton(rangeLabel)
    };

    const subtraction = (a, b) => {
        return a - b;
    }

    const firstEpisode = subtraction(data.episodes.length, data.episodes.length) + 1;
    const currentEpisode = data.currentEpisode;

    return (
        <>
        {/* <Helmet>
            <title>soma - {data.title.romaji || data.title.english} </title>
            <meta 
                name='description' 
                content={`${data.title.romaji || data.title.english} details`}
            />
        </Helmet> */}
        <InfoBanner 
            data={data} 
            firstEpisode={firstEpisode} 
            currentEpisode={currentEpisode}
        />
        <section className='info__episodes'>
            <h2>Episodes</h2>
            <div className='container container__episodes'>
                <div className='__range__info'>
                {
                    totalEpisodes > 200 && data.type !== 'MANGA' && (
                        range.map((range, index) => (
                            <button 
                                className={
                                    activeButton === `${range.start + 1}-${range.end + 1}` 
                                    ? "btn btn-primary active" 
                                    : "btn btn-primary"
                                }
                                key={index} 
                                onClick={() => handleRangeClick(range, `${range.start + 1}-${range.end + 1}`)}
                            >
                                {`${range.start + 1}-${range.end + 1}`}
                            </button>
                        )) 
                    )
                }
                </div>
                   
                <div className='episodes' 
                    style={{minHeight: data.episodes.length === 0 ? '140px' : ''}}
                >
                {
                    totalEpisodes > 200 && data.type !== 'MANGA' ? (
                        displayedEpisodes.map((item, index) => {
                            return (
                                <Link to={`/watch/${id}/${item.id}`} 
                                    key={index} 
                                    className='btn btn-primary'
                                >
                                    {
                                        item.number < 10 ? `EP 0${item.number}` : `EP ${item.number}`
                                    } 
                                </Link> 
                            )
                        })
                    ) : data.episodes && data.type !== 'MANGA' && data.episodes.length > 0 ? (
                            episodeRange.map((item, index) => {
                                return (
                                    <Link to={`/watch/${id}/${item.id}`} 
                                        key={index} 
                                        className='btn btn-primary'
                                    >
                                    {
                                        item.number < 10 ? `EP 0${item.number}` : `EP ${item.number}`
                                    } 
                                    </Link> 
                                )
                            })
                    ) : (
                        <p>NO EPISODES</p>
                    )
                }
                </div>
            </div>
        </section>
        <Relations data={data}/>
        <Recommendation data={data}/>
        </>
    )
}

export default Info
