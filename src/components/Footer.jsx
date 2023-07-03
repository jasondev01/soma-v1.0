import { Link } from 'react-router-dom'
import '../assets/css/footer.css'
import useThemeContext from '../context/ThemeContext'

const Footer = () => {
    const { theme } = useThemeContext();

    return (
        <section id='footer' className='footer'>
            <div className='container container__footer'>
                <Link to='/'>
                    <h1 className={`${theme ? 'light' : 'dark'}`}>
                        soma
                    </h1>
                </Link>
               
                <p>
                    &copy; designed and built by jason r. | <span>2023</span>
                </p>
            </div>
        </section>
    )
}

export default Footer
