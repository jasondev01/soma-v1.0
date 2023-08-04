import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import 'swiper/swiper-bundle.min.css';
import { Link } from "react-router-dom";
import { lastWatchedBreakPoints } from "../utilities/utility";
import { LazyLoadImage } from "react-lazy-load-image-component"
import '../styles/continue.css'
import useLocalStorage from "../hook/useLocalStorage";
import { useState, useEffect } from "react";

const LastWatched = () => {
    const [ watchedData, setWatchedData ] = useState([]);
    const { getSomaWatched } = useLocalStorage();

    useEffect(() => {
        const data = getSomaWatched()
        setWatchedData(data)
        // console.log('Last Watched: ', data)
    }, [])


    return (
        <>
            {
                watchedData &&
                <section className="continue">
                    <div className='section__header'>
                        <h2>Last Watched</h2>
                    </div>
                    <Swiper className='container container__continue'
                        slidesPerView={5}
                        breakpoints={lastWatchedBreakPoints}
                        spaceBetween={25}
                        navigation={true}
                        freeMode={true}
                        modules={[FreeMode, Navigation]}
                    >
                    {
                        
                        Object.values(watchedData).reverse().map((item, index) => {
                            return (
                                <SwiperSlide 
                                    key={index} 
                                    className={`continue__item`}
                                >
                                    <Link to={`/watch/${item?.id}/${item.ep[item.ep.length - 1].number}/${item.ep[item.ep.length - 1].id}`} >
                                        <div className='continue__image'>
                                            <LazyLoadImage
                                                effect="blur"
                                                src={item?.image}
                                                alt={item?.title}
                                            />
                                        </div>
                                        <div className='continue__title'>
                                            <h4>{item?.title}</h4>
                                            <span 
                                                className={`continue__episode`}
                                            >
                                                Episode {item.ep[item.ep.length - 1].number}
                                            </span>
                                        </div>
                                        <span className="continue__rating">
                                            HOT
                                        </span>
                                    </Link >
                                </SwiperSlide>
                            )
                        })
                    }
                    </Swiper>
                </section>
            }
        </>
    )
}

export default LastWatched
