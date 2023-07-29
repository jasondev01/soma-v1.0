import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import 'swiper/swiper-bundle.min.css';
import { Link } from "react-router-dom";
import { breakpoints } from "../utilities/utility";
import { LazyLoadComponent, LazyLoadImage } from "react-lazy-load-image-component";
// import { LazyLoadImage } from "react-lazy-load-image-component";

const Relations = ({data}) => {
    return (
        <>
        {
            data.relations.length > 0 && 
            <section className='info__recommendation'>
                <div className="section__header">
                    <h2>Anime, Manga, Novel Relations</h2>
                </div>
                {
                    data.relations.length > 0 ? (
                        <Swiper className='container container__recommendation'
                            slidesPerView={4}
                            breakpoints={breakpoints}
                            spaceBetween={25}
                            navigation={true}
                            freeMode={true}
                            modules={[FreeMode, Navigation]}
                        >
                        {
                            data.relations.map((item, index) => {
                                return (
                                    <SwiperSlide key={index} className='recommendation'>
                                        <Link to={`/info/${item.id}`}>
                                            <LazyLoadComponent className='recommendation__image'>
                                                <img
                                                    src={item.image} 
                                                    alt={item?.title?.romaji} 
                                                />
                                            </LazyLoadComponent>
                                            <div className='recommendation__title'>
                                                <h4>
                                                    {item?.title?.english || item?.title?.romaji}
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
                                                item.type === 'TV' ? (
                                                    <span className='recommendation__episodes'>
                                                        Episodes {item.episodes}
                                                    </span>
                                                ) : (
                                                    <span className='recommendation__episodes'>
                                                        {item.type}
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

export default Relations
