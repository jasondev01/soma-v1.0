import { useEffect, useState } from 'react'
import PopularPageContent from '../components/PopularPageContent'
import '../styles/popularpage.css'
import useApiContext from '../context/ApiContext';
import Pageloader from '../components/Pageloader';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PaginationButtons from '../components/PaginationButtons';
import { Helmet } from 'react-helmet';

const PopularPage = () => {
    const [ data, setData ] = useState([]);
    const [ pageLoad, setPageLoad ] = useState(false);
    const [ pageNumber, setPageNumber ] = useState(1);
    const [ itemsPerPage, setItemsPerPage ] = useState(20);
    const { fetchPopularPage } = useApiContext();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchPopularPage(pageNumber);
            // console.log("Popular Page", response)
            if(response) {
                setData(response)
                setPageLoad(true);
            } else {
                setTimeout(() => {
                    fetchData();
                }, 6000)
            };
        }
        fetchData()
        setPageLoad(false);
    }, [pageNumber])

    if (!pageLoad) {
        return <Pageloader />
    }

    const handlePageClick = (page) => {
        setPageNumber(page);
        const newItemsPerPage = 20;
        setItemsPerPage(newItemsPerPage);
    };

    // console.log("ItemsPerPage", itemsPerPage)


    return (
        <section className="popular__page">
            {/* <Helmet>
                <title>soma - Popular Anime </title>
                <meta 
                    name='description' 
                    content="Find Popular Anime to watch or stream"
                />
            </Helmet> */}
            <div className="section__header">
                <h2>
                    Popular Anime
                </h2>
            </div>
            <div className="container container__popular__page">
                {
                    data?.map((item, index) => {
                        const baseUrl = "https://www.youtube.com/watch?v="
                        const rank = (pageNumber - 1) * itemsPerPage + index + 1;
                        return (
                            <div 
                                key={index} 
                                className="popular__item" 
                                style={{backgroundImage: `url(${item?.cover})`}}
                            >
                                <div className="popular__item__image">
                                    <LazyLoadImage
                                        effect='blur' 
                                        src={item?.image}
                                        alt={item?.title?.romaji} 
                                    />
                                </div>
                                <PopularPageContent item={item}  baseUrl={baseUrl}/>
                                <div className='popular__item__overlay'></div>
                                <span className='popular__item__rank'>
                                    {rank}
                                </span>
                            </div>
                        )
                    })
                }
            </div>
            <div className="pagination">
                <PaginationButtons handlePageClick={handlePageClick} pageNumber={pageNumber}/>
            </div>
        </section>
    )
}

export default PopularPage
