import '../styles/header.css'
import{ RxMoon } from 'react-icons/rx'
import{ BsFillSunFill, BsSearch } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import useThemeContext from '../context/ThemeContext'
import { useEffect, useRef, useState } from 'react'

const Header = () => {
    const { theme, toggleTheme } = useThemeContext();
    const [ activeNav, setActiveNav ] = useState();
    const [ query, setQuery ] = useState('');
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const [ prevScrollPos, setPrevScrollPos ] = useState(0);
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const toggleRef = useRef(null);

    const handleNav = (nav) => {
        setActiveNav(nav)
        setIsMenuOpen(false);
    }

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            if (currentScrollPos > prevScrollPos) {
                setIsMenuOpen(false);
            } 
            setPrevScrollPos(currentScrollPos);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${query}`)
        setQuery('')
    }

    useEffect(() => {
        function handleClick(event) {
            if (toggleRef.current && toggleRef.current.contains(event.target)) {
                setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen);
            } else if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);

    return (
        <header id='header'>
            <nav className='navbar' >
                <div className='container container__navbar' >
                    <div className="navbar__home">
                        <div className={`hamburger ${isMenuOpen ? 'show' : ''}`} 
                            ref={toggleRef}
                        >
                            <span style={{
                                background: theme ?  'var(--primary)' : 'var(--primary-bg)'
                            }}></span>
                            <span style={{
                                background: theme ?  'var(--primary)' : 'var(--primary-bg)'
                            }}></span>
                            <span style={{
                                background: theme ?  'var(--primary)' : 'var(--primary-bg)'
                            }}></span>
                        </div>
                        <Link to='/'>
                            <h1 className={`logo ${theme ? 'light' : 'dark'}`}
                                onClick={() => handleNav('home')}
                            >
                                soma
                            </h1>
                        </Link>
                        <ul style={{ 
                                background: theme ? 'var(--primary-bg)' : '#e4e4e4',
                                transition: 'var(--transition)'
                            }}
                            className={`navbar__menu ${isMenuOpen ? 'show' : ''}` }
                            ref={menuRef}
                        >
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
                            <li>
                                <Link to="/ongoing" 
                                    className={`
                                        ${theme ? 'light' : 'dark'}
                                        ${activeNav === 'ongoing' ? 'active__nav' : ''}
                                    `}
                                    onClick={() => handleNav('ongoing')}
                                >
                                    Current Season
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='navbar__search'>
                        <form onSubmit={handleSubmit}
                            className={`search__form ${theme ? 'border-light' : ''}`}
                        >
                            <input 
                                type="text"
                                placeholder='search anime' 
                                className={`${theme ? 'light' : ''}`}
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                            />
                            <button type='submit' className='button__submit'>
                                <BsSearch className={`search__icon ${theme ? 'light' : ''}`}/>
                            </button>
                           
                        </form>
                        <button onClick={toggleTheme} className={`${theme ? 'light' : ''}`}>
                            {
                                theme ? (
                                    <BsFillSunFill className='theme__icon'/>
                                ) : (
                                    <RxMoon className='theme__icon'/>
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
