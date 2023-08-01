import '../styles/latestpage.css'
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import Pageloader from "../components/Pageloader";
import PaginationButtons from "../components/PaginationButtons";
import useApiContext from '../context/ApiContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Helmet } from 'react-helmet';

const LatestPage = () => {
    const [ data, setData ] = useState([]);
    const [ pageLoad, setPageLoad ] = useState(false);
    const [ pageNumber, setPageNumber ] = useState(1);
    const { fetchLatestPage } = useApiContext()
 
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchLatestPage(pageNumber);
            // console.log("Latest Page", response)
            if(response) {
                setData(response);
                setPageLoad(true)
            } else {
                setPageLoad(false)
                setTimeout(() => {
                    fetchData();
                }, 6000)
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
            {/* <Helmet>
                <title>soma - Latest Anime Release </title>
                <meta 
                    name='description' 
                    content="Find the latest episodes of your favorite anime"
                />
            </Helmet> */}
            <div className="section__header">
                <h2>
                    Latest Anime Release
                </h2>
            </div>
            <div className="container container__latest__page">
                <div className="latest__page__cards">
                    {
                        data && 
                        data.map((item, index) => {
                            const decodedTitle = decodeURIComponent(item.title.romaji);
                            const formattedTitle = decodedTitle.toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/[\s\.\,\:\(\)]/g, "");;
                            return (
                                <Link to={
                                    item.type === 'ONA' ? (
                                        `/pass/${item.id}/${item.episodeNumber}`
                                    ) : (
                                        `/watch/${item.id}/${formattedTitle}-episode-${item.episodeNumber}`
                                    )
                                } 
                                    className="latest__page__card"
                                    key={index}
                                >
                                    <div className='latest__page__card__image'>
                                        <LazyLoadImage
                                            effect='blur' 
                                            src={item.image} 
                                            alt={item.title?.english} 
                                        />
                                    </div>
                                    <div className='latest__card__title'>
                                        <h4>
                                            {item.title.english ? item.title.english : item.title.romaji }
                                        </h4>
                                    </div>
                                    {
                                        item.rating > 70 && (
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
                    <PaginationButtons handlePageClick={handlePageClick} pageNumber={pageNumber} />
                </div>
            </div>
        </section>
    )
}

export default LatestPage