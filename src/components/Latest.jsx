import '../styles/latest.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useApiContext from '../context/ApiContext'
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';

const Latest = () => {
    const { fetchLatest } = useApiContext()
    const [ data, setData ] = useState();
   
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchLatest();
            console.log("Latest: ", response)
            if(response) {
                setData(response);
            } else {
                setTimeout(() => {
                    fetchData();
                }, 6000)
            }
        };
        fetchData();
    }, []);

    return (
        <LazyLoadComponent>
        <section id='latest' className='latest'>
            <h2>Latest Release</h2>
            <div className='container container__latest'>
                {
                    data?.map( (item, index) => {
                        const decodedTitle = decodeURIComponent(item.title.romaji);
                        const formattedTitle = decodedTitle.toLowerCase()
                        .replace(/[\s]+/g, "-")
                        .replace(/[\s\.\,\:\(\)]/g, "");
                        return (
                            <div key={index} className='latest__card__container'>
                                <Link to={`/info/${item.id}`} className="latest__card">
                                    <div className='latest__card__image'>
                                        <LazyLoadImage 
                                            effect='blur'
                                            src={item.image} 
                                            alt={item?.title?.romaji}
                                        />
                                    </div>
                                    <div className='latest__card__title'>
                                        <h4>
                                            {item?.title && item?.title?.english || item?.title?.romaji}
                                        </h4>
                                    </div>
                                    {
                                        item.rating >= 75 && ( 
                                            <span className='latest__card__rating'>
                                                HOT
                                            </span>
                                        ) 
                                    }
                                </Link>
                                {
                                    item.type === "ONA" ? (
                                        <Link to={`/pass/${item.id}/${item.episodeNumber}`} className='btn btn-primary'>
                                            Episode {item.episodeNumber}
                                        </Link>
                                    ) : (
                                        <Link to={`/watch/${item.id}/${formattedTitle}-episode-${item.episodeNumber}`} className='btn btn-primary'>
                                            Episode {item.episodeNumber}
                                        </Link>
                                    )
                                }
                            </div>
                        )
                    })
                }
            </div>
        </section>
        </LazyLoadComponent>
    )
}

export default Latest
