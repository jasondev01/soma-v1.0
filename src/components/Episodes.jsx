import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import 'swiper/swiper-bundle.min.css';
import { Link } from "react-router-dom";
import { breakpoints } from "../utilities/utility";


const Episodes = ({animeResult, id}) => {
    
    console.log("animeResult",animeResult)
    return (
        <>
        <Swiper className='container__episodes'
            slidesPerView={4}
            breakpoints={breakpoints}
            spaceBetween={25}
            navigation={true}
            freeMode={true}
            modules={[FreeMode, Navigation]}
        >
            {/* to={`/pass/${id}/${episodeRange.number}`} */}
            {
                animeResult.episodes &&
                animeResult.episodes.map((item, index) => {
                    return (
                        <SwiperSlide key={index} className='popular__anime'>
                            <Link to={`/pass/${id}/${item.number}`} >
                                <div className='popular__anime__image'>
                                    <img src={animeResult?.image} alt={`${item.title} cover image`} />
                                </div>
                                <div className='popular__anime__title'>
                                    <h4>
                                        {item.title}
                                    </h4>
                                </div>
                                <span className='latest__page__episode'>
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
