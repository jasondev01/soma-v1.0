import '../styles/trending.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useApiContext from '../context/ApiContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LoadingSkeleton from './LoadingSkeleton';
import useThemeContext from '../context/ThemeContext';

const Trending = () => {
    const [ data, setData ] = useState([]);
    const [ highestRatedAnime, sethighestRatedAnime ] = useState(null);
    const [ pageLoad, setPageLoad ] = useState(false);
    const { fetchPopular } = useApiContext();
    const { theme } = useThemeContext();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchPopular();
            // console.log("Popular Section", response);
            if(response) {
                const highestRating = Math.max(...response.map(item => item.averageScore));
                const highestRatedAnime = response.find(item => item.averageScore === highestRating);
                // console.log("highestRatedAnime", highestRatedAnime);
                setData(response);
                sethighestRatedAnime(highestRatedAnime)
                setPageLoad(true);
            } else {
                setTimeout(() => {
                    fetchData();
                }, 6000)
            }
        };
        setPageLoad(false);
        fetchData();
    }, []);

    const filteredData = data.filter(item => item !== highestRatedAnime && item?.slug !== 'mushoku-tensei:-jobless-reincarnation-season-2');
    return (
        <section id='trending' className='trending'>
            <div className='section__header'>
                <h2>Popular Anime</h2>
                <Link to='/popular' className={theme ? 'light' : 'dark'}>
                    view more
                </Link>
            </div>
            {
                !pageLoad ? (
                    <LoadingSkeleton />
                ) : (
                    <div className='container container__trending'>
                    {
                        highestRatedAnime && (
                            <div className='highest__rating'>
                                <LazyLoadImage
                                    ffect='blur'
                                    src={highestRatedAnime?.coverImage} 
                                    alt={highestRatedAnime?.title?.english} 
                                />
                                <Link to={`/info/${highestRatedAnime?.slug}`} className='overlay'>
                                    <div className='highest__rating__info'>
                                        <h4>
                                            {highestRatedAnime?.title?.english || highestRatedAnime?.title?.romaji}
                                        </h4>
                                        <p className='highest__rating__description'>
                                            {
                                                highestRatedAnime?.description
                                            }
                                        </p>
                                        <div className='highest__rating__buttons'>
                                            <button className='btn btn-primary'>Read Info</button>
                                        </div>
                                    </div>
                                </Link>
                                <div className='highest__rating__info-active'>
                                    <h4>
                                        {highestRatedAnime?.title?.english || highestRatedAnime?.title?.romaji} 
                                    </h4>
                                </div>
                                <span className='highest__rating__rate'>
                                    HOT
                                </span>
                                <span className='highest__rating__rate__episodes'>
                                    Episodes {highestRatedAnime.currentEpisode}
                                </span>
                            </div>
                        )
                    }
                    {
                        filteredData.slice(0, 16).map( (item, index) => {
                            return (
                                <div key={index} className='trending__card__container'>
                                    <Link to={`/info/${item?.slug}`} className="trending__card">
                                        <div className='trending__card__image'>
                                            <LazyLoadImage
                                                effect='blur' 
                                                src={item?.coverImage} 
                                                alt={item?.title?.english} 
                                                className='image'
                                            />
                                        </div>
                                        <div className='trending__card__title'>
                                            <h4>
                                                {item?.title?.english || item?.title?.romaji}
                                            </h4>
                                        </div>
                                        {
                                            item?.averageScore >= 70 ? ( 
                                                <span className='trending__card__rating'>
                                                    HOT
                                                </span>
                                            ) : item?.averageScore && (
                                                <span className='trending__card__rating green'>
                                                    {item?.averageScore}%
                                                </span>
                                            )
                                        }
                                        {   
                                            item?.format === 'MOVIE' ? (
                                                <span className='trending__card__episodes'>
                                                    Movie
                                                </span>
                                            ) : item?.currentEpisode ? ( 
                                                <span className='trending__card__episodes'>
                                                    {item?.currentEpisode > 1 ? 'Episodes' : 'Episode'} {item?.currentEpisode}
                                                </span>
                                            ) : (
                                                <span className='trending__card__episodes'>
                                                    Coming Soon
                                                </span>
                                            )
                                        }
                                    </Link>
                                </div>
                            )
                        })
                    }
                    </div>
                )
            }
        </section>
    )
}

export default Trending
