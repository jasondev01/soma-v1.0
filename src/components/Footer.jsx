import { Link } from 'react-router-dom'
import '../styles/footer.css'

const Footer = () => {
    return (
        <section id='footer' className='footer'>
            <div className='container container__footer'>
                <h1>
                    <Link to='/'>
                        soma.
                    </Link>
                </h1>
                <ul>
                    <li>
                        <Link to='/terms'>
                            Terms of Service
                        </Link>
                    </li>
                    <li>
                        <Link to='/dmca'>
                            DMCA
                        </Link>
                    </li>
                    <li>
                        <a href='https://github.com/jasondev01/soma' 
                            className='github-icon'
                            target='_blank'
                            rel='noreferrer'
                        >
                            GitHub
                        </a>
                    </li>
                </ul>
                <p>
                    The website does not host any files on its server. Instead, it provides links to media content that are hosted on third-party services.
                </p>
                <ul>
                    <li>&copy; soma.</li>
                    <li>2023</li>
                </ul>
            </div>
        </section>
    )
}

export default Footer
