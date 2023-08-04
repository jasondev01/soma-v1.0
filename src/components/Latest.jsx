import '../styles/latest.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useApiContext from '../context/ApiContext'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LoadingSkeleton from './LoadingSkeleton';
import useThemeContext from '../context/ThemeContext'

const Latest = () => {
    const { fetchLatest } = useApiContext()
    const [ data, setData ] = useState([]);
    const [ pageLoad, setPageLoad ] = useState(false);
    const { theme } = useThemeContext()
   
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchLatest();
            if(response) {
                setPageLoad(true)
                const limitResponse = response.slice(0, 15)
                // console.log("Latest: ", limitResponse)
                setData(limitResponse);
            } else {
                setTimeout(() => {
                    fetchData();
                }, 6000)
            }
        };
        fetchData();
        setPageLoad(false)
    }, []);

    return (
        <section id='latest' className='latest'>
            <div className='section__header'>
                <h2>Latest Release</h2>
                <Link to='/latest' className={theme ? 'light' : 'dark'}>
                    view more
                </Link>
            </div>
            {
                !pageLoad ? (
                    <LoadingSkeleton />
                ) : (
                    <div className='container container__latest'>
                    {
                        data?.map( (item, index) => {
                            const decodedTitle = decodeURIComponent(item?.anime?.title?.romaji);
                            const formattedTitle = decodedTitle.toLowerCase()
                            .replace(/[\s]+/g, "-")
                            .replace(/[\s\.\,\:\(\)]/g, "");
                            return (
                                <div key={index} className='latest__card__container'>
                                    <Link to={`/info/${item?.anime?.slug}`} className="latest__card">
                                        <div className='latest__card__image'>
                                            <LazyLoadImage 
                                                effect='blur'
                                                src={item?.anime?.coverImage} 
                                                alt={item?.anime?.title?.romaji}
                                            />
                                        </div>
                                        <div className='latest__card__title'>
                                            <h4>
                                                {item?.anime.title?.english || item?.anime.title?.romaji}
                                            </h4>
                                        </div>
                                        {   
                                            
                                            item?.anime?.averageScore >= 70 ? ( 
                                                <span className='latest__card__rating'>
                                                    HOT
                                                </span>
                                            ) : item?.anime?.averageScore && (
                                                <span className='latest__card__rating green'>
                                                    {item?.anime?.averageScore}%
                                                </span>
                                            )
                                        }
                                    </Link>
                                    
                                    <Link to={`/watch/${item?.anime?.slug}/${item?.number}/${item?.id}`} className='btn btn-primary'>
                                        Episode {item?.number}
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

export default Latest
