import axios from "axios"
import '../assets/css/latestpage.css'
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import Pageloader from "../components/Pageloader";
import PaginationButtons from "../components/PaginationButtons";


const LatestPage = () => {
    const [ data, setData ] = useState([]);
    const [ pageLoad, setPageLoad ] = useState(false);
    const [ pageNumber, setPageNumber ] = useState(1);
 
    const url = `https://api.consumet.org/meta/anilist/recent-episodes?page=${pageNumber}&perPage=20&provider=gogoanime`

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                const responseData = response.data.results;
                console.log("latestPage",responseData);
                setData(responseData);
                setPageLoad(true)
            } catch(error) {
                console.log(error.message)
            }
        }
        fetchData();
        setPageLoad(false)
    }, [pageNumber])

    if(!pageLoad) {
        return <Pageloader />
    }

    const handlePageClick = (page) => {
        setPageNumber(page);
    };

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
                <div className="pagination">
                    <PaginationButtons handlePageClick={handlePageClick} pageNumber={pageNumber}/>
                </div>
            </div>
        </section>
    )
}

export default LatestPage
