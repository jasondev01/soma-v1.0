import { Link } from 'react-router-dom'
import '../styles/profile.css'

const Profile = () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
        <>
        <section className='profile__page'>
            <div className='profile__wallpaper'>
                <img 
                    src="https://images.unsplash.com/photo-1493514789931-586cb221d7a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80" 
                    alt="profile__wallpaper"
                    height={100}
                    width={100}
                />
            </div>
            <div className='profile__item'>
                <div className='profile__image'>
                    <img 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                        alt="profile__image" 
                        height={100}
                        width={100}
                    />
                </div>
                <div className='profile__info'>
                    <h3 className='profile__name'>
                        Jason Ruben
                    </h3>
                    <p className='profile__email'>
                        jasonruben@gmail.com
                    </p>
                    <span>
                        Bookmarked: 30
                    </span>
                    <span>
                        Watched: 30
                    </span>
                </div>
            </div>
        </section>
        <section style={{
            marginTop: '1rem'
        }}>
            <div className="container container__profile__content">
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
                        data.map((item, index) => {
                            return (
                                <Link 
                                    to={`/info/${''}`}
                                    key={index}
                                    className='content__item'
                                >
                                    <img 
                                        src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=745&q=80" 
                                        alt="" 
                                    />
                                    <div className='content__title'>
                                        <h3>
                                            Title
                                        </h3>
                                        <span className='content__episode'>
                                            Episode 1070
                                        </span>
                                    </div>
                                </Link>
                            )
                        })
                    }
                    </div>
                </div>
                <aside className='display__news'>
                    <div className='news__header'>
                        <h4>
                            News
                        </h4>
                    </div>
                    <article className='news__items'>
                    {
                        data.slice(0, 2).map((item, index) => {
                            return (
                                <div className="news__item">
                                    <div className='news__image'>
                                        <img 
                                            src="https://images.unsplash.com/photo-1691073123397-d93b4e3b9991?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                                            alt="" 
                                            height={100}
                                            width={100}
                                        />
                                    </div>
                                    <div className='news__title'>
                                        <h5>
                                            <a href="#">
                                                Seirei Gensouki - Spirit Chronicles Anime's 2nd Season Premieres in 2024
                                            </a>
                                        </h5>
                                        
                                    </div>
                                    <p className='news__desc'>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, non! {' '}
                                        <a href="#">Read More</a>
                                    </p>
                                    <span className='news__published'>
                                        August 7, 2022
                                    </span>
                                </div>
                            )
                        })
                    }
                    </article>
                </aside>
            </div>
        </section>
        </>
    )
}

export default Profile
