import { useEffect, useState } from 'react'
import axios from 'axios'
import '../assets/css/episode.css'
import { useParams } from 'react-router-dom';

const Episode = () => {
    const [data, setData] = useState([]);
    const [info, setInfo] = useState([]);
    // const [episodeID, setEpisodeID] = useState('');
    const { id, episodeID } = useParams();

    const epURL = `https://api.consumet.org/meta/anilist/watch/${episodeID}`;
    const infoURL =`https://api.consumet.org/meta/anilist/info/${id}?provider=gogoanime`

    useEffect(()=> {
        const fetchInfo = async () => {
            try {
                const response = await axios.get(infoURL);
                const responseData = response.data;
                console.log(responseData)
                const matchingEpisode = responseData.episodes.find(
                    (episode) => episode.id === episodeID
                );
                if (matchingEpisode) {
                    setInfo(matchingEpisode);
                    console.log(matchingEpisode)
                }
                // setInfo(responseData);
            } catch(error) {
                console.log(error.message);
            }
        }
        fetchInfo();
    }, [id])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(epURL);
                const responseData = response.data.headers;
                console.log(responseData);
                setData(responseData);
            } catch(error) {
                console.log(error.message)
            }
        }
        fetchData();
    }, [episodeID])

    const date = new Date(info.airDate);
    const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric"
    });

    return (
        <section id='episode' className='episode'>
            <div className="container container__episode">
                <div className='episode__video'>
                    <div className='iframe__container'>
                        <iframe
                            src={data.Referer}
                            title="Embedded Video"
                            allowFullScreen
                            width="100%" height="100%"
                        />
                    </div>
                    <div className='buttons'>
                        <a href="#" className='btn btn-primary'>
                            Prev EP
                        </a>
                        {/* <select className='btn btn-primary'>
                            <option>Select EP</option>
                            <option value="#">
                                    <span>
                                        EP 1
                                    </span>
                                </option>
                        </select> */}
                        <h3>Episode {info.number}</h3>
                        <a href="#" className='btn btn-primary'>
                            Next EP
                        </a>
                    </div>
                    <article className='episode__info'>
                        <div className='episode__title'>
                            <h3>
                                {info.title}
                            </h3>
                            <span>{formattedDate}</span>
                        </div>
                        <p>
                            {info.description}
                        </p>
                    </article>
                </div>
            </div>

            <div className='container more__episodes'> 
                <h2>More Episodes</h2>
                <div className='__episodes'>
                    <select className='btn btn-primary'>
                        <option>Select EP</option>
                    </select>
                    <a href="#" className='btn btn-primary'>Episode 1006</a>
                    <a href="#" className='btn btn-primary'>Episode 1006</a>
                    <a href="#" className='btn btn-primary'>Episode 1006</a>
                    <a href="#" className='btn btn-primary'>Episode 1006</a>
                    <a href="#" className='btn btn-primary'>Episode 1006</a>
                    <a href="#" className='btn btn-primary'>Episode 1006</a>
                    <a href="#" className='btn btn-primary'>Episode 1006</a>
                    <a href="#" className='btn btn-primary'>Episode 10</a>
                    
                </div>
                
            </div>          

        </section>
    )
}

export default Episode