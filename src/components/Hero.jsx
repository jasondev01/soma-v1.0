import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoaderBox from './LoaderBox';
import useApiContext from '../context/ApiContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Pagination, Autoplay, EffectFade } from 'swiper';
import '../styles/hero.css'
import { removeDuplicates } from '../utilities/utility';


const Hero = () => {
    const [ data, setData ] = useState([]);
    const [ info, setInfo ] = useState([]);
    const [ pageLoad, setPageLoad ] = useState(false);
    const { fetchHero, fetchInfo } = useApiContext()
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchHero();
            console.log('Hero Section', response)
            if(response) {
                setPageLoad(true);
                setData(response);
            } else {
                setTimeout(() => {
                    fetchData();
                }, 6000)
            }
        }
        fetchData();
        setPageLoad(false);
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            if (data.length === 0) return
            for (const item of data) {
                const response = await fetchInfo(item?.slug);
                setInfo(prevInfo => removeDuplicates([...prevInfo, response]));
            }
        }
        fetchData();
    }, [data])

    console.log("Info Hero: ", info)
    console.log("Info Single", info?.episodes?.id)

    return (
        <>
            <section id='hero' className='hero'>
            {
                !pageLoad ? (
                    <LoaderBox />
                ) : (
                    <Swiper
                        autoplay={{
                            delay: 5500,
                            disableOnInteraction: false,
                        }}
                        effect={'fade'}
                        pagination={{
                            dynamicBullets: true,
                        }}
                        modules={[Autoplay, Pagination, EffectFade]}
                    >
                        {
                            Object.values(data)?.map((item, index) => {
                                const matchEpisode = info?.find(info => info.slug === item?.slug)
                                const matchEpisodeId = matchEpisode?.episodes?.find(match => match.number === item?.currentEpisode)
                                // console.log('matchEpisode', matchEpisodeId)
                                const episodeId = matchEpisodeId?.id
                                console.log('matchEpisode', episodeId)

                                return (
                                    <SwiperSlide
                                        style={{
                                            backgroundImage: `url(${"https://cors.zimjs.com/" + item?.bannerImage})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            height: '100%!important'
                                        }} 
                                        key={index}
                                    >
                                        <div className="container container__hero" >
                                            <article className='anime__hero__info'>
                                                <span className='random__tag'>
                                                    TOP AIRING
                                                </span>
                                                <div className='anime__hero__title'>
                                                    <h3>
                                                        {item?.title?.english || item?.title?.romaji}
                                                
                                                    </h3>
                                                    <ul className='anime__status__episodes'>
                                                        <li>
                                                            { item?.year }
                                                        </li>
                                                        <li>
                                                            { 
                                                                item.format === "MOVIE" 
                                                                ? "Movie"
                                                                : item.status === 'RELEASING' ? 'Ongoing' : `${item.status}`
                                                            }
                                                        </li>
                                                            {   
                                                                item?.format === "TV" 
                                                                ? `Episode: ${ item.currentEpisode } `
                                                                : item?.format
                                                            }
                                                    </ul>
                                                </div>
                                                <p>
                                                    { item.description }
                                                </p>
                                                <div className='hero__butons'>
                                                    {
                                                        episodeId ? (
                                                            <Link to={`/watch/${item?.slug}/${item?.currentEpisode}/${episodeId}`} 
                                                                className='btn btn-primary'
                                                            >
                                                                Watch Now
                                                            </Link>
                                                        ) : (
                                                            <button
                                                                className='btn btn-primary'
                                                                disabled
                                                            >
                                                                Loading...
                                                            </button>
                                                        )
                                                    }
                                                    <Link to={`/info/${item?.slug}`} className='btn'>
                                                        Read Info
                                                    </Link>
                                                </div>
                                                
                                            </article>
                                            <div className='anime__hero__cover'>
                                                <LazyLoadImage
                                                    effect='blur' 
                                                    src={`https://cors.zimjs.com/${item.coverImage}`} 
                                                    alt={item?.title?.romaji} 
                                                />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                )
            }
            </section>
        </>
    )
}

export default Hero
