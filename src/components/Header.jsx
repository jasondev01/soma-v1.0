import '../styles/header.css'
import{ RxMoon } from 'react-icons/rx'
import{ BsFillSunFill, BsSearch } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import useThemeContext from '../context/ThemeContext'
import { useState } from 'react'

const Header = () => {
    const { theme, toggleTheme } = useThemeContext();
    const [ activeNav, setActiveNav ] = useState();
    const [ query, setQuery ] = useState('');
    const navigate = useNavigate();

    const handleNav = (nav) => {
        setActiveNav(nav)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${query}`)
        setQuery('')
    }

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
                                <Link to="/latest" 
                                    className={`
                                        ${theme ? 'light' : 'dark'} 
                                        ${activeNav === 'latest' ? 'active__nav' : ''}
                                    `}
                                    onClick={() => handleNav('latest')}
                                >
                                    Latest
                                </Link>
                            </li>
                            <li>
                                <Link to="/trending" 
                                    className={`
                                        ${theme ? 'light' : 'dark'}
                                        ${activeNav === 'trending' ? 'active__nav' : ''}
                                    `}
                                    onClick={() => handleNav('trending')}
                                >
                                    Trending
                                </Link>
                            </li>
                            <li>
                                <Link to="/popular" 
                                    className={`
                                        ${theme ? 'light' : 'dark'}
                                        ${activeNav === 'popular' ? 'active__nav' : ''}
                                    `}
                                    onClick={() => handleNav('popular')}
                                >
                                    Popular
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='navbar__search__user'>
                        <form onSubmit={handleSubmit}
                            className='search__form'
                        >
                            <input 
                                type="text"
                                placeholder='search' 
                                className={`search__icon ${theme ? 'light' : ''}`}
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                            />
                            <button type='submit'>
                                <BsSearch className={`search__icon ${theme ? 'light' : ''}`}/>
                            </button>
                        </form>
                        <button onClick={toggleTheme} className={`${theme ? 'light' : ''}`}>
                            {
                                theme ? (
                                    <BsFillSunFill className='profile__user'/>
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
