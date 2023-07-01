import '../assets/css/header.css'
import{ SiZincsearch } from 'react-icons/si'
import{ RxMoon } from 'react-icons/rx'
import{ GiSun } from 'react-icons/gi'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    const [theme, setTheme ] = useState(true);

    const toggleTheme = () => {
        setTheme(!theme)
    }

    useEffect(() => {
        if (theme) {
          document.body.style.backgroundColor = 'var(--primary-bg)';
          document.body.style.color = 'var(--primary)';
        } else {
          document.body.style.backgroundColor = 'rgb(228, 228, 228)';
          document.body.style.color = 'var(--primary-bg)';
        }
      }, [theme]);

    return (
        <header id='header'>
            <nav className='navbar'>
                <div className='container container__navbar'>
                    <div className="navbar__logo">
                        <Link to='/'>
                            <h1 className='logo'>
                                soma
                            </h1>
                        </Link>
                        
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
