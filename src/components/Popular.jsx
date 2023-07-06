import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { FreeMode, Navigation } from "swiper";
import axios from 'axios';
import '../assets/css/popular.css'
import 'swiper/swiper-bundle.min.css';
import { Link } from 'react-router-dom';
import { breakpoints } from '../utilities/utility';

const Popular = () => {
    const [ data, setData ] = useState([]);

    const popularURL = `https://api.consumet.org/meta/anilist/popular?page=1&perPage=20`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(popularURL);
                const responseData = response.data.results;
                setData(responseData)
            } catch(error) {
                console.log(error.message)
            }
        }
        fetchData();
    }, [])

    return (
        <>
            {   
                data && (
                    <section id='popular' className='popular'>
                        <h2>Popular 
                            <br />
                            <span>
                                (nagivate through arrows or grab)
                            </span>
                        </h2>
                        <Swiper className='container container__popular mySwiper'
                            slidesPerView={4}
                            breakpoints={breakpoints}
                            spaceBetween={25}
                            navigation={true}
                            freeMode={true}
                            // loop={true}
                            modules={[FreeMode, Navigation]}
                        >   
                            {   
                                data.map( (item, index) => {
                                    return (
                                        <SwiperSlide key={index} className='popular__anime'>
                                            <Link to={`/info/${item.id}`} href="#">
                                                <div className='popular__anime__image'>
                                                    <img src={item.image} alt="" />
                                                </div>
                                                <div className='popular__anime__title'>
                                                    <h4>
                                                        {item.title.english ? item.title.english : item.title.romaji}
                                                    </h4>
                                                </div>
                                                {
                                                    item.rating >= 75 ? (
                                                        <span className='popular__anime__rating'>
                                                            HOT
                                                        </span>
                                                    ) : (
                                                        <span className='popular__anime__rating green'>
                                                            {item.rating}%
                                                        </span>
                                                    )
                                                }
                                                {   
                                                    item.type === 'MOVIE' ? (
                                                        <span className='popular__anime__episodes'>
                                                            Movie
                                                        </span>
                                                    ) : (
                                                        <span className='popular__anime__episodes'>
                                                            Episodes {item.totalEpisodes}
                                                        </span>
                                                    ) 
                                                }
                                            </Link >
                                        </SwiperSlide>
                                    )
                                })
                            }
                            
                        </Swiper>
                    </section>
                )
            }
        </>
    )
}

export default Popular
