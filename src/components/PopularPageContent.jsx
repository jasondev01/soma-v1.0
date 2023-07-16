import React from 'react'
import { Link } from 'react-router-dom'

const PopularPageContent = ({item, baseUrl}) => {

    // console.log("PopularPageContent", item)
    return (
        <article className='popular__article'>
            <div className="popular__title">
                <span>Title:</span>
                <Link to='/'>
                    <h3>
                        {item?.title?.english || item?.title?.romaji}
                    </h3>
                </Link>
            </div>
            <div className="popular__info">
                <span>Genres:</span>
                <ul>
                    {
                        item?.genres &&
                        item?.genres.map((item, index) => {
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
                    item?.releaseDate &&
                    <p>{item?.releaseDate}</p>
                }
            </div>
            <div className="popular__info">
                <span>Status:</span>
                {
                    item?.status && 
                    <p>{item?.status}</p>
                }
            </div>
            
            <div className="popular__info">
                <span>Rating:</span>
                {
                    item?.rating &&
                    <p>
                        {item?.rating}%
                    </p>
                }
            </div>
            <div className="popular__info">
                <span>Category:</span>
                {
                    item?.type && 
                    item?.type === "TV" ? (
                        <p>
                            {item?.type} Series
                        </p>
                    ) : (
                        <p>
                            {item?.type}
                        </p>
                    )
                }
            </div>
            <div className="popular__info">
                <span>Total Episodes:</span>
                {
                    item?.totalEpisodes &&
                    <p>
                        {item?.totalEpisodes}
                    </p>
                }
            </div>
            <div className="popular__info">
                <span>Trailer:</span>
                {
                    item?.trailer &&
                    <a href={`${baseUrl}${item?.trailer?.id}`} target="_blank" rel="noreferrer">Watch Trailer</a>
                }
            </div>
            <div className="popular__info">
                <span>Summary:</span>
                <p className="summary">
                    {item?.description}
                </p>
                <Link to={`/info/${item.id}`}>Read More</Link>
            </div>
        </article>
    )
}

export default PopularPageContent
