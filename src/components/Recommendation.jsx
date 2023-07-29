import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import 'swiper/swiper-bundle.min.css';
import { Link } from "react-router-dom";
import { breakpoints } from "../utilities/utility";
import { LazyLoadComponent, LazyLoadImage } from "react-lazy-load-image-component";

const Recommendation = ({data}) => {

    return (
        <>
        {
            data.recommendations.length > 0 &&
            <section className='info__recommendation'>
                <div className="section__header">
                    <h2>You might also like</h2>
                </div>
                {
                    data.recommendations.length > 0 ? (
                        <Swiper className='container container__recommendation'
                            slidesPerView={4}
                            breakpoints={breakpoints}
                            spaceBetween={25}
                            navigation={true}
                            freeMode={true}
                            modules={[FreeMode, Navigation]}
                        >
                        {
                            data.recommendations.map((item, index) => {
                                return (
                                    <SwiperSlide key={index} className='recommendation'>
                                        <Link to={`/info/${item.id}`}>
                                            <LazyLoadComponent className='recommendation__image'>
                                                <img
                                                    src={item.image} 
                                                    alt={item.title.romaji} 
                                                />
                                            </LazyLoadComponent>
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
                                                ) : !item.rating ? (
                                                    <span className='recommendation__rating green d-none'>
                                                        {item.rating}%
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
                                                ) : item.type === 'MANGA' || item.type.type === 'span' ? (
                                                    <span className='recommendation__episodes'>
                                                        Manga
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
        }
        </>
        
    )
}

export default Recommendation

