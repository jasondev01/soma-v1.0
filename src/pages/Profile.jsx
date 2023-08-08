import { useNavigate } from 'react-router-dom'
import '../styles/profile.css'
import { useEffect, useState } from 'react'
import useApiContext from '../context/ApiContext'
import NoProfile from '../assets/no_profile.jpg'
import NoWallpaper from '../assets/no_wallpaper.jpg'
import useAuthContext from '../context/AuthContext'
import News from '../components/News'
import ProfileContent from '../components/ProfileContent'
import useThemeContext from '../context/ThemeContext';

const Profile = () => {
    const [ news, setNews ] = useState([]);
    const [ bookmarked, setBookmarked ] = useState([])
    const { getNews } = useApiContext();
    const { user } = useAuthContext();
    const { theme } = useThemeContext();
    const navigate = useNavigate();
    
    const fetchNews = async () => {
        try {
            const response = await getNews()
            console.log("News", response);
            setNews(response)
        } catch(error) {    
            console.log("error", error)
        }
    }

    useEffect(() => {
        fetchNews()

        const storedUser = JSON.parse(localStorage.getItem('User'));

        if (user) {
            // If the user is logged in, update the bookmarked state from user data
            setBookmarked(user.bookmarked);
        } else if (storedUser) {
            // If the user is not logged in but there's stored user data, update the bookmarked state from stored data
            setBookmarked(storedUser?.bookmarked);
        } else {
            // If neither user nor stored data is available, navigate to "/"
            navigate('/');
        }
    }, [user])

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
                    <h3 className={`profile__name 
                        ${theme ? 'light' : 'dark'}`}
                    >
                        {user?.name}
                    </h3>
                    <p className={`profile__email ${theme ? 'light' : 'dark'}`}>
                        {user?.email}
                    </p>
                    <span className={`${theme ? 'light' : 'dark'}`}>
                        Bookmarked: {bookmarked.length < 10 ? `0${bookmarked.length}` : bookmarked.length }
                    </span>
                    <span className={`${theme ? 'light' : 'dark'}`}>
                        Watched: 30
                    </span>
                </div>
            </div>
        </section>
        <section style={{
            marginTop: '1rem'
        }}>
            <div className="container container__profile__content">
                <ProfileContent bookmarked={bookmarked} />
                <News news={news}/>
            </div>
        </section>
        </>
    )
}

export default Profile
