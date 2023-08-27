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
            const latestWatched = user?.watched?.sort((a, b) => new Date(b?.updatedAt) - new Date(a?.updatedAt))
            setWatchedData(latestWatched)
        } else {
            const latestWatched = storedUser?.watched?.sort((a, b) => new Date(b?.updatedAt) - new Date(a?.updatedAt))
            setWatchedData(latestWatched)
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
                        navigation={true}
                        freeMode={true}
                        modules={[FreeMode, Navigation]}
                    >
                    {
                        watchedData?.map((item, index) => {
                            const current = item.episodes[item.episodes?.length - 1]
                            return (
                                <SwiperSlide 
                                    key={index} 
                                    className={`continue__item`}
                                >
                                    <Link to={`/watch/${item?.slug}/${current?.number}/${current?.id}`} >
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
                                                Episode {current?.number}
                                            </span>
                                        </div>
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
