import React from 'react'
import { Link } from 'react-router-dom'

const PopularPageContent = ({item}) => {

    // console.log("PopularPageContent", item)
    return (
        <article className='popular__article'>
            <div className="popular__title">
                <span>Title:</span>
                <Link to={`/info/${item.slug}`}>
                    <h3>
                        {item?.title?.english || item?.title?.romaji}
                    </h3>
                </Link>
            </div>
            <div className="popular__info">
                <span>Genres:</span>
                <ul>
                    {
                        item?.genre &&
                        item?.genre.map((item, index) => {
                            return (
                                <li key={index}>
                                    {item}
                                </li>
                            )
                        })
                    }
                    
                </ul>
            </div>
            <div className="popular__info">
                <span>Released:</span>
                {
                    item?.year &&
                    <p>{item?.year}</p>
                }
            </div>
            <div className="popular__info">
                <span>Status:</span>
                {
                    item?.status && 
                    <p>{item?.status === 'RELEASING' ? 'Ongoing' : item?.status}</p>
                }
            </div>
            
            <div className="popular__info">
                <span>Rating:</span>
                {
                    item?.averageScore &&
                    <p>
                        {item?.averageScore}%
                    </p>
                }
            </div>
            <div className="popular__info">
                <span>Category:</span>
                {
                    item?.format && 
                    item?.format === "TV" ? (
                        <p>
                            {item?.format} Series
                        </p>
                    ) : (
                        <p>
                            {item?.format}
                        </p>
                    )
                }
            </div>
            <div className="popular__info">
                <span>Total Episodes:</span>
                {
                    item?.currentEpisode &&
                    <p>
                        {item?.currentEpisode > 1 ? `${item?.currentEpisode} episodes` : `${item?.currentEpisode} episode`} 
                    </p>
                }
            </div>
            {/* <div className="popular__info">
                <span>Trailer:</span>
                {
                    item?.trailer &&
                    <a href={`${baseUrl}${item?.trailer?.id}`} target="_blank" rel="noreferrer">Watch Trailer</a>
                }
            </div> */}
            <div className="popular__info">
                <span>Summary:</span>
                <p className="summary">
                    {item?.description}
                </p>
                <Link to={`/info/${item?.slug}`}>Read More</Link>
            </div>
        </article>
    )
}

export default PopularPageContent
