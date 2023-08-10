import { useEffect, useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom"

const ProfileContent = ({bookmarked, watched}) => {
    const [ active, setActive ] = useState('bookmarked');
    const [ currentPage, setCurrentPage ] = useState(1);
    const itemsPerPage = 20;

    const handleActive = (show) => {
        setActive(show);
        setCurrentPage(1);
    }

    const dataToShow = active === 'bookmarked' ? bookmarked?.slice().reverse() : watched?.slice().reverse();
    const totalItems = dataToShow.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = dataToShow?.slice(startIndex, endIndex);

    useEffect(() => {
        window.scrollTo({top: 70});
    }, [currentPage]);

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
            <div className='display__content'>
            {
                paginatedData?.map((item, index) => {
                    return (
                        <Link 
                            to={`/info/${item?.slug}`}
                            key={index}
                            className='content__item'
                        >
                            <LazyLoadImage 
                                src={item?.image} 
                                alt={item?.title} 
                            />
                            <div className='content__title'>
                                <h3>
                                    {item?.title}
                                </h3>
                                {
                                    active === 'watched' && 
                                    <span className='content__episode'>
                                        Last Episode Watched: {item?.episodes[item?.episodes?.length - 1]?.number}
                                    </span>
                                }
                            </div>
                        </Link>
                    )
                })
            }
            </div>
            <div className="display__pagination">
                {
                    Array?.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            disabled={currentPage === index + 1}
                            className={`btn btn-primary ${currentPage === index + 1 ? 'active' : ''}`}
                        >
                            {index + 1}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default ProfileContent
