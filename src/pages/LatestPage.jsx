import axios from "axios"
import '../assets/css/latestpage.css'
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";


const LatestPage = () => {
    const [ data, setData ] = useState([]);

    const url = `https://api.consumet.org/meta/anilist/recent-episodes?page=1&perPage=20&provider=gogoanime`

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                const responseData = response.data.results;
                console.log(responseData);
                setData(responseData);
            } catch(error) {
                console.log(error.message)
            }
        }
        fetchData();
    }, [])

    return (
        <section className="latest__page" >
            <div className="container container__latest__page">
                <h2>
                    Latest Release
                </h2>
                
                <div className="latest__page__cards">
                    {
                        data && 
                        data.map((item, index) => {
                            return (
                                <Link to={`/info/${item.id}`} 
                                    className="latest__page__card"
                                    key={index}
                                >
                                    <div className='latest__page__card__image'>
                                        <img src={item.image} alt={`${item.title?.english} cover image`} />
                                    </div>
                                    <div className='latest__card__title'>
                                        <h4>
                                            {item.title.english ? item.title.english : item.title.romaji }
                                        </h4>
                                    </div>
                                    {
                                        item.rating > 75 && (
                                            <span className='latest__card__rating'>
                                                HOT
                                            </span>
                                        ) 
                                    }
                                    {
                                        item.episodeNumber && 
                                        <span className="latest__page__episode">
                                            Episode {item.episodeNumber}
                                        </span>
                                    }
                                    
                                </Link>
                            )
                        })
                        
                    }
                    
                </div>

            </div>
        </section>
    )
}

export default LatestPage
