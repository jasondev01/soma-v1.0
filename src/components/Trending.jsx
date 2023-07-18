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
    const { fetchTrending } = useApiContext();
    const { theme } = useThemeContext();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchTrending();
            if(response) {
                const highestRating = Math.max(...response.map(item => item.rating));
                const highestRatedAnime = response.find(item => item.rating === highestRating);
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

    const filteredData = data.filter(item => item !== highestRatedAnime);

    return (
        <section id='trending' className='trending'>
            <div className='section__header'>
                <h2>Trending</h2>
                <Link to='/trending' className={theme ? 'light' : 'dark'}>
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
                                    src={highestRatedAnime.image} 
                                    alt={highestRatedAnime.title?.english} 
                                />
                                <Link to={`/info/${highestRatedAnime.id}`} className='overlay'>
                                    <div className='highest__rating__info'>
                                        <h4>
                                            {highestRatedAnime.title.english ? highestRatedAnime.title.english : highestRatedAnime.title.romaji}
                                        </h4>
                                        <p className='highest__rating__description'>
                                            {
                                                highestRatedAnime.description
                                            }
                                        </p>
                                        <div className='highest__rating__buttons'>
                                            <button className='btn btn-primary'>Read Info</button>
                                        </div>
                                    </div>
                                </Link>
                                <div className='highest__rating__info-active'>
                                    <h4>
                                        {highestRatedAnime.title.english ? highestRatedAnime.title.english : highestRatedAnime.title.romaji} 
                                    </h4>
                                </div>
                                <span className='highest__rating__rate'>
                                    HOT
                                </span>
                                <span className='highest__rating__rate__episodes'>
                                    Episodes {highestRatedAnime.totalEpisodes}
                                </span>
                            </div>
                        )
                    }
                    {
                        filteredData.map( (item, index) => {
                            return (
                                <div key={index} className='trending__card__container'>
                                    <Link to={`/info/${item.id}`} className="trending__card">
                                        <div className='trending__card__image'>
                                            <LazyLoadImage
                                                effect='blur' 
                                                src={item.image} 
                                                alt={item.title?.english} 
                                                className='image'
                                            />
                                        </div>
                                        <div className='trending__card__title'>
                                            <h4>
                                                {item?.title?.english || item?.title?.romaji}
                                            </h4>
                                        </div>
                                        {
                                            item.rating >= 75 && ( 
                                                <span className='trending__card__rating'>
                                                    HOT
                                                </span>
                                            ) 
                                        }
                                        {   
                                            item.type === 'MOVIE' ? (
                                                <span className='trending__card__episodes'>
                                                Movie
                                                </span>
                                            ) : item.totalEpisodes ? ( 
                                                <span className='trending__card__episodes'>
                                                    Episodes {item.totalEpisodes }
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
