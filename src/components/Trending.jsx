import axios from 'axios'
import '../assets/css/trending.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { removeHtmlTags } from '../utilities/utility';

const Trending = () => {

    const [ data, setData ] = useState([]);
    const [ highestRatedItem, setHighestRatedItem ] = useState(null);

    const trendingURL = `https://api.consumet.org/meta/anilist/trending?page=1&perPage=7`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(trendingURL);
                const responseData = response.data.results;
                console.log(responseData);
                const sanitizedData = responseData.map(item => ({
                    ...item,
                    // removing html tags using the function 
                    htmlString: removeHtmlTags(item.htmlString)
                }));
                setData(sanitizedData);

                // Find the item with the highest rating
                const highestRating = Math.max(...sanitizedData.map(item => item.rating));
                const highestRatedItem = sanitizedData.find(item => item.rating === highestRating);
                setHighestRatedItem(highestRatedItem);
            } catch(error) {
                console.log(error.message);
                setTimeout(() => {
                    fetchData()
                }, 6000);
            }
        }
        fetchData();
    }, [])

    const filteredData = data.filter(item => item !== highestRatedItem);

    return (
        <>
            {
                data && 
                <section id='trending' className='trending'>
                    <h2>Trending</h2>
                    <div className='container container__trending'>
                    {
                        highestRatedItem && (
                            <div className='highest__rating'>
                                <img src={highestRatedItem.image} alt={highestRatedItem.title?.english} />
                                <Link to={`/info/${highestRatedItem.id}`} className='overlay'>
                                    <div className='highest__rating__info'>
                                        <h4>
                                            {highestRatedItem.title.english ? highestRatedItem.title.english : highestRatedItem.title.romaji}
                                        </h4>
                                        <p className='highest__rating__description'>
                                            {
                                                removeHtmlTags(highestRatedItem.description )
                                            }
                                        </p>
                                        <div className='highest__rating__buttons'>
                                            <button className='btn btn-primary'>Read Info</button>
                                        </div>
                                    </div>
                                </Link>
                                <div className='highest__rating__info-active'>
                                    <h4>
                                        {highestRatedItem.title.english ? highestRatedItem.title.english : highestRatedItem.title.romaji} 
                                    </h4>
                                </div>
                                <span className='highest__rating__rate'>
                                    HOT
                                </span>
                                <span className='highest__rating__rate__episodes'>
                                    Episodes {highestRatedItem.totalEpisodes}
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
                                            <img src={item.image} alt={item.title?.english} className='image'/>
                                        </div>
                                        <div className='trending__card__title'>
                                            <h4>
                                                {item.title.english ? item.title.english : item.title.romaji}
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
                </section>
            }
        </>
        
    )
}

export default Trending
