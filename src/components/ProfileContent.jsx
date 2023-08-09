import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const ProfileContent = ({bookmarked, watched}) => {

    const [ active, setActive ] = useState('bookmarked');
 
    const handleActive = (show) => {
        setActive(show)
    }

    const page1 = bookmarked?.slice(0, 2)

    return (
        <div className='display__contents'>
            <ul className='display__options'>
                <li
                    className={`${active === 'bookmarked' ? 'active' : '' }`}
                    onClick={() => handleActive('bookmarked')}
                >
                    Bookmarked List
                </li>
                <li
                    className={`${active === 'watched' ? 'active' : '' }`}
                    onClick={() => handleActive('watched')}
                >
                    Watched List
                </li>
            </ul>
            <div className={`${ bookmarked?.length > 0 ? 'display__content' : ''}`}
            >
            {
                bookmarked?.length > 0 && active === 'bookmarked' ? (
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
                                    {/* <span className='content__episode'>
                                        Episode {item?.currentEpisode}
                                    </span> */}
                                </div>
                            </Link>
                        )
                    })
                ) : watched?.length > 0 && active === 'watched' ? (
                    watched?.slice().reverse().map((item, index) => {
                        const current = item?.episodes[item?.episodes?.length - 1]
                        return (
                            <Link 
                                to={`/watch/${item?.slug}/${current.number}/${current.id}`}
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
                                        Episode {current.number}
                                    </span>
                                </div>
                            </Link>
                        )
                    })
                ) : (
                    <p>
                        No Listed Yet
                    </p>
                )
            }
            </div>
        </div>
    )
}

export default ProfileContent
