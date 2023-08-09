import { Link } from "react-router-dom"

const ProfileContent = ({bookmarked}) => {
    return (
        <div className='display__contents'>
            <ul className='display__options'>
                <li>
                    Bookmarked
                </li>
                <li>
                    Watched
                </li>
            </ul>
            <div className='display__content'>
            {
                bookmarked?.map((item, index) => {
                    return (
                        <Link 
                            to={`/info/${item?.slug}`}
                            key={index}
                            className='content__item'
                        >
                            <img 
                                src={item?.image} 
                                alt="" 
                            />
                            <div className='content__title'>
                                <h3>
                                    {item?.title}
                                </h3>
                                <span className='content__episode'>
                                    Episode {item?.currentEpisode}
                                </span>
                            </div>
                        </Link>
                    )
                })
            }
            </div>
        </div>
    )
}

export default ProfileContent
