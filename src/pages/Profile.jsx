import { useNavigate } from 'react-router-dom'
import '../styles/profile.css'
import { useEffect, useState } from 'react'
import useApiContext from '../context/ApiContext'
import NoProfile from '../assets/no_profile.webp'
import NoWallpaper from '../assets/no_wallpaper.webp'
import useAuthContext from '../context/AuthContext'
import News from '../components/News'
import ProfileContent from '../components/ProfileContent'
import useThemeContext from '../context/ThemeContext';

const Profile = () => {
    const [ news, setNews ] = useState([]);
    const [ bookmarked, setBookmarked ] = useState([])
    const [ watched, setWatched ] = useState([])
    const { getNews } = useApiContext();
    const { user } = useAuthContext();
    const { theme } = useThemeContext();
    const navigate = useNavigate();
    
    const fetchNews = async () => {
        try {
            const response = await getNews()
            // console.log("News", response);
            setNews(response)
        } catch(error) {    
            console.log("error", error)
        }
    }

    useEffect(() => {
        fetchNews()
        const storedUser = JSON.parse(localStorage.getItem('User'));

        if (user || storedUser) {
            // if the user is logged in, update the states from user data
            setBookmarked(user?.bookmarked || storedUser?.bookmarked);
            setWatched(user?.watched || storedUser?.watched )
        } else {
            // if there is no user, navigate to "/"
            navigate('/');
        }
    }, [])

    return (
        <>
        <section className='profile__page'>
            <div 
                style={{
                    background: `url(${NoWallpaper}) no-repeat`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top'
                }}
                className='profile__wallpaper'
            >
                {/* <img 
                    src={NoWallpaper} 
                    alt="profile__wallpaper"
                    height={100}
                    width={100}
                /> */}
            </div>
            <div className='profile__item'>
                <div className='profile__image'>
                    <img 
                        src={NoProfile} 
                        height={100}
                        width={100}
                    />
                </div>
                <div className='profile__info'>
                    <h2 className={`${theme ? 'light' : 'dark'}`}>
                        {user?.name}
                    </h2>
                    <p className={`profile__email ${theme ? 'light' : 'dark'}`}>
                        {user?.email}
                    </p>
                    {
                        bookmarked?.length > 0 &&
                        <span className={`${theme ? 'light' : 'dark'}`}>
                            Bookmarked: {bookmarked?.length < 10 ? `0${bookmarked?.length}` : bookmarked?.length}
                        </span>
                    }
                    {
                        watched?.length > 0 && 
                        <span className={`${theme ? 'light' : 'dark'} `}>
                            Watched: {watched?.length < 10 ? `0${watched?.length}` : watched?.length}
                        </span>
                    }
                </div>
            </div>
        </section>
        <section style={{
            marginTop: '1rem'
        }}>
            <div className="container container__profile__content">
                <ProfileContent bookmarked={bookmarked} watched={watched} />
                <News news={news}/>
            </div>
        </section>
        </>
    )
}

export default Profile
