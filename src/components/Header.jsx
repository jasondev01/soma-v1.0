import '../assets/css/header.css'
import{ SiZincsearch } from 'react-icons/si'
import{ RxMoon } from 'react-icons/rx'
import{ GiSun } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import useThemeContext from '../context/ThemeContext'

const Header = () => {
    const { theme, toggleTheme } = useThemeContext();

    return (
        <header id='header'>
            <nav className='navbar'>
                <div className='container container__navbar'>
                    <div className="navbar__home">
                        <Link to='/'>
                            <h1 className={`logo ${theme ? 'light' : 'dark'}`}>
                                soma
                            </h1>
                        </Link>
                        <ul className='navbar__menu'>
                            <li>
                                <a href="#" className={`${theme ? 'light' : 'dark'}`}>
                                    Latest
                                </a>
                            </li>
                            <li>
                                <a href="#" className={`${theme ? 'light' : 'dark'}`}>
                                    Trending
                                </a>
                            </li>
                            <li>
                                <a href="#" className={`${theme ? 'light' : 'dark'}`}>
                                    Popular
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='navbar__search__user'>
                        <form action="" className='search__form'>
                            <input type="text" placeholder='search' className={`search__icon ${theme ? 'light' : ''}`}/>
                            <button type='submit'><SiZincsearch className={`search__icon ${theme ? 'light' : ''}`}/></button>
                        </form>
                        <button onClick={toggleTheme} className={`${theme ? 'light' : ''}`}>
                            {
                                theme ? (
                                    <GiSun className='profile__user'/>
                                ) : (
                                    <RxMoon className='profile__user'/>
                                )
                            }
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
