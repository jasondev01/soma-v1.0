import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const ProfileContent = ({bookmarked}) => {

    const [ active, setActive ] = useState('bookmarked');
 
    const handleActive = (show) => {
        setActive(show)
    }

    const page1 = bookmarked.slice(0, 2)

    return (
        <div className='display__contents'>
            <ul className='display__options'>
                <li
                    className={`${active === 'bookmarked' ? 'active' : '' }`}
                    onClick={() => handleActive('bookmarked')}
                >
                    Bookmarked
                </li>
                <li
                    className={`${active === 'watched' ? 'active' : '' }`}
                    onClick={() => handleActive('watched')}
                >
                    Watched
                </li>
            </ul>
            <div className={`${ bookmarked?.length > 0 ? 'display__content' : ''}`}
            >
            {
                bookmarked?.length > 0 ? (
                    bookmarked?.slice().reverse().map((item, index) => {
                        return (
                            <Link 
                                to={`/info/${item?.slug}`}
                                key={index}
                                className='content__item'
                            >
                                <img 
                                    src={item?.image} 
                                    alt={item?.title} 
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
                ) : (
                    <p>
                        No Listed Bookmarked Yet
                    </p>
                )
            }
            </div>
        </div>
    )
}

export default ProfileContent
