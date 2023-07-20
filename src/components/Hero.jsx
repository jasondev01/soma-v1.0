import '../styles/hero.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoaderBox from './LoaderBox';
import useApiContext from '../context/ApiContext';
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';

const Hero = () => {
    const [ data, setData ] = useState([]);
    const [ episodeId, setEpisodeId ] = useState();
    const [ pageLoad, setPageLoad ] = useState(false);
    const { fetchHero } = useApiContext()
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchHero();
            // console.log('Hero Section', response)
            if(response) {
                setData(response);
                setPageLoad(true);
                const getEpisodeId = response.episodes.find(num => num.number === 1)
                setEpisodeId(getEpisodeId.id)
                // console.log('getEpisodeId', getEpisodeId)
            } else {
                setTimeout(() => {
                    fetchData();
                }, 6000)
            }
        }
        fetchData();
        setPageLoad(false);
    }, [])

    return (
        <LazyLoadComponent>
        <section id='hero' className='hero' style={{backgroundImage: `url(${data?.cover})`}} >
                {
                    !pageLoad ? (
                        <LoaderBox />
                    ) : (
                        <div className="container container__hero" >
                            <article className='anime__hero__info'>
                                <span className='random__tag'>
                                    Random
                                </span>
                                <div className='anime__hero__title'>
                                    <h3>
                                        {data?.title?.english || data?.title?.romaji}
                                
                                    </h3>
                                    <ul className='anime__status__episodes'>
                                        <li>
                                            { data?.startDate?.year }
                                        </li>
                                        <li>
                                            { 
                                                data.type === "MOVIE" 
                                                ? ""
                                                : data.status
                                            }
                                        </li>
                                            {   
                                                data?.type === "TV" 
                                                ? `EP: ${ data.currentEpisode } `
                                                : data?.type
                                            }
                                    </ul>
                                </div>
                                <p>
                                    { data.description }
                                </p>
                                <div className='hero__butons'>
                                    <Link to={`/watch/${data.id}/${episodeId}`} className='btn btn-primary'>
                                        Watch Now
                                    </Link>
                                    <Link to={`/info/${data.id}`} className='btn'>
                                        Read Info
                                    </Link>
                                </div>
                                
                            </article>
                            <div className='anime__hero__cover'>
                                <LazyLoadImage
                                    effect='blur' 
                                    src={data.image} 
                                    alt={data?.title?.romaji} 
                                />
                            </div>
                        </div>
                    )
                }
        </section>
        </LazyLoadComponent>
    )
}

export default Hero
