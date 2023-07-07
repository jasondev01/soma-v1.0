import React, { useEffect, useState } from 'react'
import '../assets/css/info.css'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Pageloader from '../components/Pageloader';
import Recommendation from '../components/Recommendation';
import InfoBanner from '../components/InfoBanner';
import { removeHtmlTags } from '../utilities/utility';


const Info = () => {
    const [ data, setData ] = useState([])
    const [ displayedEpisodes, setDisplayedEpisodes ] = useState([]);
    const [ episodeRange, setEpisodeRange ] = useState([]);
    const [ pageLoad, setPageLoad ] = useState(false)
    const { id } = useParams();

    // Api url queue for info
    const info = `https://api.consumet.org/meta/anilist/info/${id}?provider=gogoanime`

    // Get the data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(info);
                const responseData = response.data;
                // removeHTML tags on a text upon receiving/using
                const cleanedDescription = removeHtmlTags(responseData.description)
                console.log(responseData);
                setEpisodeRange(responseData.episodes)
                setData({...responseData, description: cleanedDescription});
                setPageLoad(true)
            } catch(error) {
                console.log(error.message);
                setTimeout(() => {
                    fetchData();
                }, 6000);
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
    const handleRangeClick = (range) => {
        const start = totalEpisodes - range.end - 1;
        const end = totalEpisodes - range.start - 1;
        const episodesToShow = episodeRange.slice(start, end + 1);
        setDisplayedEpisodes(episodesToShow);
    };

    return (
        <>
        <InfoBanner data={data}/>
        <section className='info__episodes'>
            <h2>Episodes</h2>
            <div className='container container__episodes'>
                <div className='__range__info'>
                    {
                        totalEpisodes > 200 && 
                        range.map((range, index) => (
                            <button 
                                className="btn btn-primary"
                                key={index} 
                                onClick={() => handleRangeClick(range)}
                            >
                                EP {`${range.start + 1}-${range.end + 1}`}
                            </button>
                        )) 
                    }
                </div>
                   
                <div className='episodes'>
                    {
                        totalEpisodes > 200 ? (
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
                        ) : data.episodes && data.episodes.length > 0 ? (
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
        <Recommendation data={data}/>
        </>
    )
}

export default Info
