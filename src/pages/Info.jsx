import React, { useEffect, useState } from 'react'
import '../assets/css/info.css'
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import DOMPurify from 'dompurify';
import Pageloader from '../components/Pageloader';
import Recommendation from '../components/Recommendation';

const Info = () => {
    const [ data, setData ] = useState([])
    const { id } = useParams();
    const [ showAllEpisodes, setShowAllEpisodes ] = useState(false);
    const [ episodeRange, setEpisodeRange ] = useState([]);
    const [ pageLoad, setPageLoad ] = useState(false)
    const navigate = useNavigate();

    // Api urll queue for info
    const info = `https://api.consumet.org/meta/anilist/info/${id}?provider=gogoanime`

    // Get the data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(info);
                const responseData = response.data;
                // removeHTML tags on a text upon receiving/using
                const cleanedDescription = removeHtmlTags(responseData.description)
                // console.log(responseData);
                setEpisodeRange(responseData.episodes.length)
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

    // title filtering
    const title = data.title ? (data.title.english || data.title.romaji) : 'N/A';

    // removeHTML tags on a text
    const removeHtmlTags = (htmlString) => {
        const sanitizedString = DOMPurify.sanitize(htmlString, { ALLOWED_TAGS: [] });
        return sanitizedString;
    };

    // Scroll to the top
    useEffect(() => {
        window.scrollTo({top: 0});
    }, [id]); 

    // Pageload
    if(!pageLoad) {
        return <Pageloader />
    }

    const totalEpisodes = episodeRange; // Replace with your total episode count
    const rangeSize = 200; // Number of episodes in each range
    const numRanges = Math.ceil(totalEpisodes / rangeSize);

    const range = [];
    for (let i = 0; i < numRanges; i++) {
    const start = i * rangeSize;
    const end = Math.min(start + rangeSize - 1, totalEpisodes - 1);
    range.push({ start, end });
    }
    
    const handleRangeClick = (range) => {
        const start = totalEpisodes - range.end - 1;
        const end = totalEpisodes - range.start - 1;
        const episodesToShow = episodeRange.slice(start, end + 1);
        console.log(episodesToShow);
    };

    return (
        <>
        <section id='info' className='info' style={{backgroundImage: `url(${data.cover})`}} >
        
        {/* <section id='info' className='info'> */}
            <div className="container container__info" >
                
                <div className='anime__info__cover'>
                    
                    <img src={data.image} alt=" cover image" />
                    {/* <a href="#" className='btn btn-primary'>trailer</a> */}
                </div>
                <article className='anime__info__info'>
                    
                    <div className='anime__info'>
                        <span>Title:</span>
                        <h3>
                            {title}
                        </h3>
                    </div>
                    
                    <ul className='anime__info__ul'>
                        <span>Genres:</span>
                        {   
                            data.genres && (
                                data.genres.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            {item}
                                        </li>
                                    )
                                })
                            )
                        }
                    </ul>

                    <div className='anime__info'>
                        <span>Released:</span>
                        <p>
                            {data.releaseDate}
                        </p>
                    </div>

                    <div className='anime__info'>
                        <span>Status:</span>
                        <p>
                            {data.status}
                        </p>
                    </div>

                    <ul className='anime__info__ul'>
                        <span>Other Names:</span>
                        <li>
                        { 
                            data.synonyms && (
                                data.synonyms.map((item, index) => {
                                        return (
                                            <p key={index}>{item}, </p>
                                        )
                                    })
                            )
                        }
                        </li>
                    </ul>

                    <ul className='anime__info__ul'>
                        <span>Studios:</span>
                        {
                            data.studios && (
                                 data.studios.map((item, index)=> {
                                    return (
                                    <li key={index}>
                                        {item}
                                    </li>
                                    )
                                })
                            )
                        }
                    </ul>
                    {
                        data.rating && (
                            <div className='anime__info'>
                                <span>Rating:</span>
                                <p>
                                    {data.rating}%
                                </p>
                            </div>
                        )
                    }
                    <div className='anime__info'>
                        <span>Category:</span>
                        {
                            data.type &&
                            data.type === 'TV' ? (
                                <p>
                                    {data.type} Series
                                </p>
                            ) : (
                                <p>
                                    {data.type}
                                </p>
                            )
                        }
                    </div>

                    <div className='anime__info'>
                        <span>Total Episodes:</span>
                        <p>
                            {data.currentEpisode}
                        </p>
                    </div>

                    <div className='anime__info'>
                        <span>Popularity:</span>
                        <p>
                            {data.popularity}
                        </p>
                    </div>

                    <div className='anime__info'>
                        <span>Summary:</span>
                        <p>
                            {data.description}
                        </p>
                    </div>
                    
                </article>
            </div>
        </section>

        <section className='info__episodes'>
            <h2>Episodes</h2>
            <div className='container container__episodes'>
                <div className='__range'>
                    {   
                        episodeRange > 200 && 
                        range.map((range, index) => (
                            <button className='btn btn-primary' key={index} onClick={() => handleRangeClick(range)}>
                            EP {`${range.start + 1}-${range.end + 1}`}
                            </button>
                        ))
                    }
                </div>
                   
                <div className='episodes'>
                    {
                        data.episodes && data.episodes.length > 0 ? (
                            data.episodes.slice(0, showAllEpisodes ? data.episodes.length : 45).map((item, index) => {
                                return (
                                    <Link to={`/watch/${id}/${item.id}`} onClick={() => navigate(`/watch/${id}/${item.id}`)} className='btn btn-primary' key={index}>
                                        EP {item.number}
                                    </Link>
                                )
                            })
                        ) : (
                            <p>NO EPISODES</p>
                        )
                    }
                    {
                        !showAllEpisodes && 
                        data.episodes && 
                        data.episodes.length > 45 && (
                        <button className='btn btn-primary' onClick={() => setShowAllEpisodes(true)}>
                            MORE
                        </button>
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
