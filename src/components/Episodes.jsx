import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import 'swiper/swiper-bundle.min.css';
import { Link } from "react-router-dom";
import { breakpoints } from "../utilities/utility";
import "../styles/episodes.css"
import { LazyLoadImage } from "react-lazy-load-image-component";
import useAuthContext from "../context/AuthContext";
import { useEffect, useState } from "react";

const Episodes = ({animeResult, episodeNumber, id}) => {
    const [ isWatched, setIsWatched ] = useState([]);
    const { user } = useAuthContext();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('User'));
        if (user || storedUser) {
            // if the user is logged in, update the isWatched state from user data
            const response = user?.watched || storedUser?.watched
            const matchedAnime = response?.find(item => item.slug === id)
            setIsWatched(matchedAnime)
        } 
    }, [animeResult, episodeNumber, id])


    return (
        <>
        <Swiper className='container__episodes'
            slidesPerView={5}
            breakpoints={breakpoints}
            spaceBetween={25}
            navigation={true}
            freeMode={true}
            modules={[FreeMode, Navigation]}
        >
            {
                animeResult?.anime?.episodes &&
                animeResult?.anime?.episodes.slice().reverse().map((item, index) => {
                    const currentEpisode = episodeNumber === item.number ? true : false;
                    const alreadyWatched = isWatched?.episodes?.find(e => e.number === item.number)
                    return (
                        <SwiperSlide 
                            key={index} 
                            className={`anime__episodes ${currentEpisode ? 'active__episode' : ''}`}
                        >
                            <Link to={`/watch/${id}/${item?.number}/${item?.id}`} >
                                <div className='anime__episode__image'>
                                    <LazyLoadImage
                                        effect="blur"
                                        src={item?.image !== null ? `${item?.image}` : `${animeResult?.anime?.coverImage}`} 
                                        alt={item?.title}
                                    />
                                </div>
                                {
                                    item.title &&
                                    <div className='anime__episode__title'>
                                        <h4>{item.title}</h4>
                                    </div>
                                }
                                <span 
                                    className={`anime__episode__episode ${currentEpisode || alreadyWatched?.number === item.number ? 'active' : ''}`}
                                >
                                    Episode {item.number}
                                </span>
                            </Link >
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
        </>
        
    )
}

export default Episodes
