import { useEffect, useState } from "react";
import "../styles/searchpage.css"
import useApiContext from "../context/ApiContext";
import { Link, useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Pageloader from "../components/Pageloader";
import { Helmet } from "react-helmet";

const About = () => {
    const [ data, setData ] = useState([]);
    const [ pageLoad, setPageLoad ] = useState(false);
    const [ pageNumber, setPageNumber ] = useState(1);
    const { fetchSearch } = useApiContext();
    const { query } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchSearch(query, pageNumber);
            // console.log("Search Page: ", response)
            if(response) {
                setData(response)
                setPageLoad(true)
            } else {
                setTimeout(() => {
                    fetchData();
                }, 6000)
            }
        }
        fetchData();
        setPageLoad(false)
    }, [query, pageNumber])

    if (!pageLoad) {
        return (<Pageloader />)
    }

    return (
        <section className="search__page">
            {/* <Helmet>
                <title>soma - Search Results {`for ${query}`} </title>
                <meta 
                    name='description' 
                    content="Search for an anime or movie to watch or stream"
                />
            </Helmet> */}
            <div className='section__header'>
                <h2>
                    Search Results &nbsp;
                    <span className="query" >
                        {`for ${query}`}
                    </span> 
                </h2>
            </div>
            <div className="container container__search__page">
            {
                data.length > 0 ? (
                    data?.map((item, index) => {
                        return (
                            <Link to={`/info/${item.id}`}
                                key={index} 
                                className="search__page__item"
                            >
                                <div className="search__image">
                                    <LazyLoadImage
                                        effect="blur" 
                                        src={item?.image} 
                                        alt="" 
                                    />
                                    {
                                        item?.title &&
                                        <h4 className="search__title">
                                            {item.title?.english || item?.title?.romaji}
                                        </h4>
                                    }
                                </div>
                            </Link>
                        )
                    })
                ) : (
                    <p> SORRY NO RESULT </p> 
                )
            }
            </div>
        </section>
        
    )
}

export default About

                
