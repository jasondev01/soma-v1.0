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
import { useState, useEffect } from "react";
import useAuthContext from "../context/AuthContext";

const LastWatched = () => {
    const [ watchedData, setWatchedData ] = useState([]);
    const { user } = useAuthContext();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('User'));
        if (user) {
            // if the user is logged in, update the watched state from user data
            setWatchedData(user?.watched)
        } else {
            setWatchedData(storedUser?.watched)
        } 
    }, [])

    return (
        <>
            {
                user?.name && watchedData?.length > 0 &&
                <section className="continue">
                    <div className='section__header'>
                        <h2> {user?.name}, this is your last watched anime</h2>
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
                        watchedData?.slice().reverse().map((item, index) => {
                            const current = item.episodes[item.episodes.length - 1]
                            return (
                                <SwiperSlide 
                                    key={index} 
                                    className={`continue__item`}
                                >
                                    <Link to={`/watch/${item?.slug}/${current.number}/${current.id}`} >
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
                                                Episode {current.number}
                                            </span>
                                        </div>
                                        {/* <span className="continue__rating">
                                            HOT
                                        </span> */}
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
