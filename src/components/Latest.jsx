import '../assets/css/latest.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Latest = () => {
    const [data, setData] = useState([]);

    const latestURL = `https://api.consumet.org/meta/anilist/recent-episodes?page=1&perPage=10}&provider=gogoanime`;

    useEffect(() => {
        const fetchLatest = async () => {
            try {
                const response = await axios.get(latestURL);
                const responseData = response.data.results;
                setData(responseData);
            } catch(error) {
                console.log(error.message);
            }
        };
        fetchLatest();
    }, [2])

    return (
        <section id='latest' className='latest'>
            <h2>Latest Release</h2>
            <div className='container container__latest'>
                
                {
                    data.map( (item, index) => {
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
                        <a href="" className='btn btn-primary'>Episode {item.episodeNumber}</a>
                    </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Latest
