import { Link } from 'react-router-dom'
import '../styles/profile.css'
import { AiOutlineInfoCircle } from 'react-icons/ai'

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
        <section>
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
                                <Link key={index}
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
                    <article className='display__news__item'>
                        <div className='news__item__image'>
                            <img 
                                src="" 
                                alt="" 
                            />
                        </div>
                        <div>
                            ar
                        </div>
                    </article>
                </aside>
            </div>
        </section>
        </>
    )
}

export default Profile
