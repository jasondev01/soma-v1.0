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
import LoadingSkeleton from './LoadingSkeleton';
import useThemeContext from '../context/ThemeContext';

const Popular = () => {
    const [ data, setData ] = useState([]);
    const [ pageLoad, setPageLoad ] = useState(false);
    const { fetchPopular } = useApiContext();
    const { theme } = useThemeContext();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchPopular();
            // console.log("Popular Section", response);
            if(response) {
                setData(response)
                setPageLoad(true)
            } else {
                // setTimeout(() => {
                //     fetchData();
                // }, 6000)
            }
        }
        fetchData();
        setPageLoad(false)
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
                <Link to="/popular" className={theme ? 'light' : 'dark'}>
                    view more
                </Link>
            </div>
            {
                !pageLoad ? (
                    <LoadingSkeleton />
                ) : (
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
                                                item.rating >= 70 ? (
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
                )
            }
        </section>
    )
}

export default Popular
