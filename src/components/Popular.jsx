import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { FreeMode, Navigation } from "swiper";
import '../styles/popular.css'
import 'swiper/swiper-bundle.min.css';
import { Link } from 'react-router-dom';
import { breakpoints } from '../utilities/utility';
import useApiContext from '../context/ApiContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Popular = () => {
    const [ data, setData ] = useState([]);
    const { fetchPopular } = useApiContext()

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchPopular();
            // console.log("Popular Section", response);
            if(response) {
                setData(response)
            } else {
                setTimeout(() => {
                    fetchData();
                }, 6000)
            }
        }
        fetchData();
    }, [])

    return (
        <section id='popular' className='popular'>
            <div className='section__header'>
                <h2>Popular 
                    <br />
                    <span>
                        (swipe to navigate)
                    </span>
                </h2>
                <Link to="/popular">
                    view more
                </Link>
            </div>
            <Swiper className='container container__popular'
                slidesPerView={4}
                breakpoints={breakpoints}
                spaceBetween={25}
                navigation={true}
                freeMode={true}
                // loop={true}
                modules={[FreeMode, Navigation]}
            >   
                {   
                    data?.map( (item, index) => {
                        return (
                            <SwiperSlide key={index} className='popular__anime'>
                                <Link to={`/info/${item.id}`}>
                                    <div className='popular__anime__image'>
                                        <LazyLoadImage
                                            effect='blur' 
                                            src={item.image} 
                                            alt={item?.title?.romaji} 
                                        />
                                    </div>
                                    <div className='popular__anime__title'>
                                        <h4>
                                            {item?.title?.english || item?.title?.romaji}
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
                                                Episodes {item?.totalEpisodes}
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

export default Popular
