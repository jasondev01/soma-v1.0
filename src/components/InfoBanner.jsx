import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const InfoBanner = ({data, currentEpisode, firstEpisode}) => {
    
    const baseUrl = "https://www.youtube.com/watch?v="

    // console.log("currentEpisode", currentEpisode)
    // console.log("firstEpisode", firstEpisode)
    // console.log("anime data: ", data)
    const findCurrentEpisode = data.episodes.find(episode => episode.number === currentEpisode)
    const findFirstEpisode = data.episodes.find(episode => episode.number === firstEpisode)
    // console.log('findCurrentEpisode', findCurrentEpisode)

    return (
        <section id='info' className='info' style={{backgroundImage: `url(${data?.bannerImage})`}} >
            <div className="container container__info" >
                <div className='anime__info__cover'>
                    {
                        data?.coverImage &&
                        <LazyLoadImage
                            effect="blur" 
                            src={data?.coverImage} 
                            alt={data?.title?.romaji} 
                        />
                    }
                </div>
                <article className='anime__info__info'>
                    {
                        data?.title &&
                        <div className='anime__info'>
                            <span>Title:</span>
                            <h3>
                                {data?.title?.english || data?.title?.romaji}
                            </h3>
                        </div>
                    }
                    {
                        data?.genre?.length > 0 && 
                        <ul className='anime__info__ul'>
                            <span>Genres:</span>
                            {   
                                (
                                    data?.genre.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                {item}
                                            </li>
                                        )
                                    })
                                )
                            }
                        </ul>
                    }
                    {
                        data?.year &&
                        <div className='anime__info'>
                            <span>Released:</span>
                            <p>
                                {data?.year}
                            </p>
                        </div>
                    }
                    {
                        data?.season &&
                        <div className='anime__info'>
                            <span>Season:</span>
                            <p>
                                {data?.season}
                            </p>
                        </div>
                    }
                    {
                        data?.status &&
                        <div className='anime__info'>
                            <span>Status:</span>
                            <p>
                                {data?.status === 'RELEASING' ? 'Ongoing' : (data?.status === 'FINISHED' ? 'Completed' : data?.status)}
                            </p>
                        </div>
                    }
                    {
                        data.synonyms.length > 0 &&
                        <ul className='anime__info__ul'>
                            <span>Other Names:</span>
                            <li> 
                            { 
                                data.synonyms.map((item, index) => {
                                    return (
                                        <p key={index}> {item}, &nbsp;</p>
                                    )
                                })
                            }
                            </li>
                        </ul>
                    }
                    {
                        data?.averageScore && 
                        <div className='anime__info'>
                            <span>Rating:</span>
                            <p>
                                {data?.averageScore}%
                            </p>
                        </div>
                    }
                    {
                        data?.format &&
                        <div className='anime__info'>
                            <span>Category:</span>
                            {
                                data?.format === 'TV' ? (
                                    <p>
                                        {data?.format} Series
                                    </p>
                                ) :  (
                                    <p>
                                        {data?.format}
                                    </p>
                                )
                            }
                        </div>
                    }
                    {
                        data?.currentEpisode &&
                        <div className={`anime__info ${data.currentEpisode === 0 ? 'd-none' : ''}`}>
                            <span>Total Episodes:</span>
                            <p>
                                {
                                    data?.currentEpisode > 1 
                                    ? `${data?.currentEpisode} episodes` 
                                    : `${data?.currentEpisode} episode`
                                } 
                            </p>
                        </div>
                    }
                    {
                        data?.popularity &&
                        <div className={`anime__info ${data.popularity === 0 ? 'd-none' : ''}`}>
                            <span>Popularity:</span>
                            <p>
                                {data?.popularity}
                            </p>
                        </div>
                    }
                    {/* {
                        data?.trailer?.id &&
                        <div className='anime__info'>
                                <span>Trailer:</span>
                                <a href={`${baseUrl}${data?.trailer?.id}`} 
                                    target="__blank" rel="noreferrer"
                                    style={{textDecoration: "underline"}}
                                >
                                    Watch Trailer
                                </a>
                        </div>
                    } */}
                    <div className='anime__info'>
                        <span>Summary:</span>
                        <p>
                            {data?.description}
                        </p>
                    </div>
                    {
                        data?.episodes.length > 0 && data?.type !== 'MANGA' ? (
                            <div className='anime__info__buttons'>
                                <Link 
                                    to={`/watch/${data?.slug}/${findCurrentEpisode?.number}/${findCurrentEpisode?.id}`} 
                                    className="btn btn-primary"
                                >
                                {
                                    data.episodes.length <= 10
                                    ? `Watch EP 0${data?.currentEpisode}`
                                    : `Watch EP ${currentEpisode}`
                                }
                                </Link>
                                <Link 
                                    to={`/watch/${data?.slug}/${findFirstEpisode?.number}/${findFirstEpisode?.id}`} 
                                    className="btn"
                                >
                                    Watch EP 0{firstEpisode}
                                </Link>
                            </div>
                        ) : (
                            <div></div>
                        )
                    }
                </article>
            </div>
        </section>
    )
}
export default InfoBanner
