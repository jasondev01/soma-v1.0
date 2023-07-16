import '../styles/cards.css'
import axios from "axios"
import { useEffect, useState, } from "react";

const Cards = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState([]);

    const url = `https://api.consumet.org/meta/anilist-manga/latest`;
    const searchUrl =`https://api.consumet.org/meta/anilist-manga/`
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(url);
            const responseData = response.data.results
            responseData.sort((a, b) => b.id - a.id);
            setData(responseData);
          } catch (error) {
            console.log(error.message);
            if (error.status === 500) return (<div>Error</div>)
          }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(searchUrl+search);
            const searchData = response.data.results;
            searchData.sort((a, b) => b.id - a.id);
            setSearchData(searchData);
            console.log(searchData)
        } catch (error) {
            console.log(error.message);
            if (error.status === 500) { 
                return (<div>Error</div>)
            }
        }
    };

    return (
        <section id='cards'>
            
            <div className='container container__cards'>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <button type='submit'>Search</button>
                </form>
                {   
                    search ? ( 
                        searchData.map( (data, index) => {
                            return (
                                <div className='card'>
                                    <div className='card__image'>
                                        <img src={data.image} alt="" />
                                    </div>
                                    <a href='#' className='card__title'>
                                        <h3>
                                            {data.title.english ? data.title.english : data.title.romaji}
                                        </h3>
                                    </a>
                                </div>
                            )
                        })

                    ) : (
                        data.map( data => {
                            return (
                                <div className='card'>
                                    <div className='card__image'>
                                        <img src={data.image} alt="" />
                                    </div>
                                    <a href='#' className='card__title'>
                                        <h3>
                                            {data.title.english ? data.title.english : data.title.romaji}
                                        </h3>
                                    </a>
                                </div>
                            )
                        })
                    )
                }
                
            </div>
        </section>
    )
}

export default Cards
