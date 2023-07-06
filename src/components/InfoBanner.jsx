const InfoBanner = ({data}) => {
    
    const title = data.title ? (data.title.english || data.title.romaji) : 'N/A';

    return (
        <section id='info' className='info' style={{backgroundImage: `url(${data.cover})`}} >
        {/* <section id='info' className='info'> */}
            <div className="container container__info" >
                
                <div className='anime__info__cover'>
                    
                    <img src={data.image} alt=" cover image" />
                    {/* <a href="#" className='btn btn-primary'>trailer</a> */}
                </div>
                <article className='anime__info__info'>
                    <div className='anime__info'>
                        <span>Title:</span>
                        <h3>
                            {title}
                        </h3>
                    </div>
                    <ul className='anime__info__ul'>
                        <span>Genres:</span>
                        {   
                            data.genres && (
                                data.genres.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            {item}
                                        </li>
                                    )
                                })
                            )
                        }
                    </ul>
                    <div className='anime__info'>
                        <span>Released:</span>
                        <p>
                            {data.releaseDate}
                        </p>
                    </div>
                    <div className='anime__info'>
                        <span>Status:</span>
                        <p>
                            {data.status}
                        </p>
                    </div>
                    <ul className='anime__info__ul'>
                        <span>Other Names:</span>
                        <li> 
                        { 
                            data.synonyms && (
                                data.synonyms.map((item, index) => {
                                    return (
                                        <p key={index}> {item}, &nbsp;</p>
                                    )
                                })
                            )
                        }
                        </li>
                    </ul>
                    <ul className='anime__info__ul'>
                        <span>Studios:</span>
                        {
                            data.studios && (
                                 data.studios.map((item, index)=> {
                                    return (
                                    <li key={index}>
                                        {item}
                                    </li>
                                    )
                                })
                            )
                        }
                    </ul>
                    {
                        data.rating && (
                            <div className='anime__info'>
                                <span>Rating:</span>
                                <p>
                                    {data.rating}%
                                </p>
                            </div>
                        )
                    }
                    <div className='anime__info'>
                        <span>Category:</span>
                        {
                            data.type &&
                            data.type === 'TV' ? (
                                <p>
                                    {data.type} Series
                                </p>
                            ) : (
                                <p>
                                    {data.type}
                                </p>
                            )
                        }
                    </div>
                    <div className='anime__info'>
                        <span>Total Episodes:</span>
                        <p>
                            {data.currentEpisode}
                        </p>
                    </div>
                    <div className='anime__info'>
                        <span>Popularity:</span>
                        <p>
                            {data.popularity}
                        </p>
                    </div>
                    <div className='anime__info'>
                        <span>Summary:</span>
                        <p>
                            {data.description}
                        </p>
                    </div>
                </article>
            </div>
        </section>
    )
}
export default InfoBanner
