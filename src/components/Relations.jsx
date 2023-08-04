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
                    <h2>Relations: </h2>
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
                                        <Link to={`/info/${item?.anime?.slug}`}>
                                            <LazyLoadComponent className='recommendation__image'>
                                                <img
                                                    src={item?.anime?.coverImage} 
                                                    alt={item?.title?.romaji} 
                                                />
                                            </LazyLoadComponent>
                                            <div className='recommendation__title'>
                                                <h4>
                                                    {item?.anime?.title?.english || item?.anime?.title?.romaji}
                                                </h4>
                                            </div>
                                            {
                                                
                                                item?.anime?.averageScore >= 75 ? (
                                                    <span className='recommendation__rating'>
                                                        HOT
                                                    </span>
                                                ) : item?.anime?.averageScore && (
                                                    <span className='recommendation__rating green '>
                                                        {item?.anime.averageScore}%
                                                    </span>
                                                )
                                            }
                                            {
                                                item?.anime?.currentEpisode &&
                                                item?.anime?.format === 'TV' ? (
                                                    <span className='recommendation__episodes'>
                                                        {
                                                            item?.anime?.currentEpisode && item?.anime?.currentEpisode > 0 
                                                            ? `Episodes ${item?.anime?.currentEpisode}` 
                                                            : `Episode ${item?.anime?.currentEpisode}`
                                                        }
                                                    </span>
                                                ) : (
                                                    <span className='recommendation__episodes'>
                                                        {item?.anime?.format}
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
