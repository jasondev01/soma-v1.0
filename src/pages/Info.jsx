import React, { useEffect, useState } from 'react'
import '../assets/css/info.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { FreeMode, Navigation } from "swiper";
import 'swiper/swiper-bundle.min.css';
import DOMPurify from 'dompurify';

const Info = () => {
    const [ data, setData ] = useState([])
    const { id } = useParams();
    const [ showAllEpisodes, setShowAllEpisodes ] = useState(false);
    const navigate = useNavigate();

    const info = `https://api.consumet.org/meta/anilist/info/${id}`

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(info);
                const responseData = response.data;
                const cleanedDescription = removeHtmlTags(responseData.description)
                console.log(responseData);
                setData({...responseData, description: cleanedDescription});
            } catch(error) {
                console.log(error.message);
            }
        }
        fetchData();
    }, [id])

    const title = data.title ? (data.title.english || data.title.romaji) : 'N/A';

    const removeHtmlTags = (htmlString) => {
        const sanitizedString = DOMPurify.sanitize(htmlString, { ALLOWED_TAGS: [] });
        return sanitizedString;
    };

    const breakpoints = {
        1200: {
            slidesPerView: 4,
            spaceBetween: 25,
        },
        600: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
        0: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
      };
    
    // Scroll to the top
    useEffect(() => {
    window.scrollTo({top: 0});
    }, [data.recommendations]); 
      

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
                                data.synonyms.map((item) => {
                                        return (
                                            <p>{item}, </p>
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
                <div className='episodes'>
                    {
                        data.episodes && data.episodes.length > 0 ? (
                            data.episodes.slice(0, showAllEpisodes ? data.episodes.length : 45).map((item, index) => {
                                return (
                                    <a href="#" className='btn btn-primary' key={index}>
                                        EP {item.number}
                                    </a>
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

        
        <section className='info__recommendation'>
            <h2>Recommendations</h2>
            {
                data.recommendations && data.recommendations.length > 0 ? (
                    <Swiper className='container container__recommendation'
                        slidesPerView={4}
                        breakpoints={breakpoints}
                        spaceBetween={25}
                        navigation={true}
                        freeMode={true}
                        // loop={true}
                        modules={[FreeMode, Navigation]}
                    >
                    {
                        data.recommendations.map((item, index) => {
                            return (
                                <SwiperSlide key={index} className='recommendation'>
                                    <Link to={`/info/${item.id}`} onClick={() => navigate(`/info/${item.id}`)}>
                                        <div className='recommention__image'>
                                            <img src={item.image} alt="" />
                                        </div>
                                        <div className='recommendation__title'>
                                            <h4>
                                                {item.title && item.title.english ? item.title.english : item.title.romaji}
                                            </h4>
                                        </div>
                                        {
                                            item.rating &&
                                            item.rating >= 75 ? (
                                                <span className='recommendation__rating'>
                                                    HOT
                                                </span>
                                            ) : (
                                                <span className='recommendation__rating green'>
                                                    {item.rating}%
                                                </span>
                                            )
                                        }
                                        {
                                            item.episodes &&
                                            item.type === 'MOVIE' ? (
                                                <span className='recommendation__episodes'>
                                                    Movie
                                                </span>
                                            ) : (
                                                <span className='recommendation__episodes'>
                                                    Episodes {item.episodes}
                                                </span>
                                            )
                                        }
                                    </Link>
                                </SwiperSlide>
                            )
                        })
                    }
                    </Swiper>
                ) : (
                    <p>NO RECOMMENDATION</p>
                )
            } 
        </section>
        </>
    )
}

export default Info
