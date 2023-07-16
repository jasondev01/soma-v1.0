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

const Episodes = ({animeResult, episodeNumber, id}) => {
    
    // console.log("Episodes", episodeNumber)
    // console.log("currentEpisode", currentEpisode)
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
                animeResult.episodes &&
                animeResult.episodes.map((item, index) => {
                    const currentEpisode = episodeNumber === item.number ? true : false;
                    return (
                        <SwiperSlide 
                            key={index} 
                            className={`anime__episodes ${currentEpisode ? 'active__episode' : ''}`}
                        >
                            <Link to={`/watch/${id}/${item.id}`} >
                                <div className='anime__episode__image'>
                                    <LazyLoadImage
                                        effect="blur"
                                        src={animeResult?.image} 
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
                                    className={`anime__episode__episode ${currentEpisode ? 'active' : ''}`}
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
