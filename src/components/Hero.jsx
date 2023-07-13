import '../assets/css/hero.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoaderBox from './LoaderBox';
import useApiContext from '../context/ApiContext';

const Hero = () => {
    const [ data, setData ] = useState([]);
    const [ pageLoad, setPageLoad ] = useState(false);
    const { fetchHero } = useApiContext()
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchHero();
                setData(response);
                setPageLoad(true);
            } catch(error) {
                console.log("fetchHero: ", error.message)
                // setTimeout(() => {
                //     fetchData();
                // }, 6000)
            }
        }
        fetchData();
        setPageLoad(false);
    }, [])


    return (
        <section id='hero' className='hero' style={{backgroundImage: `url(${data.cover})`}} >
                {
                    !pageLoad ? (
                        <LoaderBox />
                    ) : (
                        <div className="container container__hero" >
                            <article className='anime__hero__info'>
                                <div className='anime__hero__title'>
                                    <h3>
                                        {data.title?.english ?? data.title?.romaji}
                                    </h3>
                                    <ul className='anime__status__episodes'>
                                        <li>
                                            { data.startDate?.year }
                                        </li>
                                        <li>
                                            { 
                                                data.type === "MOVIE" 
                                                ? ""
                                                : data.status
                                            }
                                        </li>
                                            {   
                                                data.type = "MOVIE" 
                                                ? ( "MOVIE" ) 
                                                : data.currentEpisode 
                                                ? ( `EP: ${ data.currentEpisode } `) 
                                                : ("Coming Soon" )
                                            }
                                    </ul>
                                </div>
                                <p>
                                    { data.description }
                                </p>
                                <Link to={`/info/${data.id}`} className='btn btn-primary'>
                                    Read Info
                                </Link>
                            </article>
                            <div className='anime__hero__cover'>
                                <img src={data.image} alt=" cover image" />
                            </div>
                        </div>
                    )
                }
        </section>
    )
}

export default Hero
