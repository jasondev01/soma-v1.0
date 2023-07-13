import '../assets/css/latest.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useApiContext from '../context/ApiContext'

const Latest = () => {
    const { fetchLatest } = useApiContext()
    const [ data, setData ] = useState();
   
    useEffect(() => {
        const fetchData = async () => {
            try {   
                const response = await fetchLatest();
                setData(response);
                console.log("Latest: ", response)
            } catch(error) {
                console.log("latest", error.message)
                setTimeout(() => {
                    fetchData();
                }, 6000 )
            }
        };
        fetchData();
    }, []);

    console.log("latestData", data)

    return (
        <>
            {
                data && 
                <section id='latest' className='latest'>
                    <h2>Latest Release</h2>
                    <div className='container container__latest'>
                        {
                            data?.map( (item, index) => {
                                return (
                            <div key={index} className='latest__card__container'>
                                <Link to={`/info/${item.id}`} className="latest__card">
                                    <div className='latest__card__image'>
                                        <img src={item.image} alt=" cover image" />
                                    </div>
                                    <div className='latest__card__title'>
                                        <h4>
                                            {item.title && item.title.english ? item.title.english : item.title.romaji}
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
                                <Link to={`/pass/${item.id}/${item.episodeNumber}`} className='btn btn-primary'>
                                    Episode {item.episodeNumber}
                                </Link>
                            </div>
                                )
                            })
                        }
                    </div>
                </section>
            }
        </>
        
    )
}

export default Latest
