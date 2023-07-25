import '../styles/ongoing.css'
import useThemeContext from '../context/ThemeContext'

const OngoingPage = () => {

    const { theme } = useThemeContext();

    return (
        <section className='ongoing__page'>
            <div className="section__header">
                <h2>
                    Ongoing Anime Series 
                </h2>
            </div>
            <div className="container container__ongoing">
                <h3>
                    Current Season: Summer 2023
                </h3>
                <div className="ongoing__items">
                    <div className="ongoing__item">
                        <div className='ongoing__image'>
                            <img src="https://images.unsplash.com/photo-1690055898834-553d613aed7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80" alt="" />
                            <div className='ongoing__title__studio'>
                                <h4>
                                    Jujutsu Kaisen
                                </h4>
                                <span>
                                    Mappa
                                </span>
                            </div>
                        </div>
                        <article className='ongoing__article'>
                            <div className='ongoing__current__ep'>
                                EP 4 of 23 airing in
                            </div>
                            <div className='ongoing__countdown'>
                                1 day, 20hrs
                            </div>
                            <div className='ongoing__description'>
                                <p className=''>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae at explicabo quia ab sint numquam eaque laudantium magnam illum recusandae! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat delectus ipsam modi deleniti commodi voluptatem rerum ab vero, asperiores neque!
                                </p>
                            </div>
                            <ul className='ongoing__genres'>
                                <li>
                                    Gore
                                </li>
                                <li>
                                    Study
                                </li>
                                <li>
                                    Any genre
                                </li>
                            </ul>
                        </article>
                    </div>
                    <div className="ongoing__item">
                        <div className='ongoing__image'>
                            <img src="https://images.unsplash.com/photo-1690055898834-553d613aed7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80" alt="" />
                            <div className='ongoing__title__studio'>
                                <h4>
                                    Jujutsu Kaisen
                                </h4>
                                <span>
                                    Mappa
                                </span>
                            </div>
                        </div>
                        <article className='ongoing__article'>
                            <div className='ongoing__current__ep'>
                                EP 4 of 23 airing in
                            </div>
                            <div className='ongoing__countdown'>
                                1 day, 20hrs
                            </div>
                            <div className='ongoing__description'>
                                <p className=''>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae at explicabo quia ab sint numquam eaque laudantium magnam illum recusandae! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat delectus ipsam modi deleniti commodi voluptatem rerum ab vero, asperiores neque!
                                </p>
                            </div>
                            <ul className='ongoing__genres'>
                                <li>
                                    Gore
                                </li>
                                <li>
                                    Study
                                </li>
                                <li>
                                    Any genre
                                </li>
                            </ul>
                        </article>
                    </div>
                    <div className="ongoing__item">
                        <div className='ongoing__image'>
                            <img src="https://images.unsplash.com/photo-1690055898834-553d613aed7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80" alt="" />
                            <div className='ongoing__title__studio'>
                                <h4>
                                    Jujutsu Kaisen
                                </h4>
                                <span>
                                    Mappa
                                </span>
                            </div>
                        </div>
                        <article className='ongoing__article'>
                            <div className='ongoing__current__ep'>
                                EP 4 of 23 airing in
                            </div>
                            <div className='ongoing__countdown'>
                                1 day, 20hrs
                            </div>
                            <div className='ongoing__description'>
                                <p className=''>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae at explicabo quia ab sint numquam eaque laudantium magnam illum recusandae! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat delectus ipsam modi deleniti commodi voluptatem rerum ab vero, asperiores neque!
                                </p>
                            </div>
                            <ul className='ongoing__genres'>
                                <li>
                                    Gore
                                </li>
                                <li>
                                    Study
                                </li>
                                <li>
                                    Any genre
                                </li>
                            </ul>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OngoingPage
