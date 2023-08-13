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
import { Helmet } from 'react-helmet'

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
            setBookmarked(user?.bookmarked || storedUser?.bookmarked);
            setWatched(user?.watched || storedUser?.watched )
        } else {
            navigate('/');
        }
    }, [])

    // Calculate the total count of episodes across all watched items
    const totalEpisodeCount = watched.reduce((total, index) => {
        return total + index.episodes.length;
    }, 0);
  
    return (
        <>
        <section className='profile__page'>
            <Helmet>
                <title>{user?.profile?.username || user?.name}'s Profile </title>
                <meta 
                    name='description' 
                    content={user?.profile?.username || user?.name}
                />
                <meta property="og:image" content={user?.profile?.wallpaper || NoWallpaper} />
            </Helmet>
            <div 
                style={{
                    // backgroundSize: 'cover',
                    background: `url(${user?.profile?.wallpaper || NoWallpaper}) no-repeat center center/cover`
                }}
                className='profile__wallpaper'
            >
                {/* <img 
                    src={user?.profile?.wallpaper} 
                    alt="profile__wallpaper"
                    height={100}
                    width={100}
                /> */}
            </div>
            <div className='profile__item'>
                <div className='profile__image'>
                    <img 
                        src={user?.profile?.image || NoProfile} 
                        height={100}
                        width={100}
                    />
                </div>
                <div className='profile__info'>
                    <h2 className={`${theme ? 'light' : 'dark'}`}>
                        {user?.profile?.username || user?.name}
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
                            Watched: {totalEpisodeCount}
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
