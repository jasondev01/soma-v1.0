import { Link } from 'react-router-dom'
import '../styles/footer.css'

const Footer = () => {
    return (
        <section id='footer' className='footer'>
            <div className='container container__footer'>
                <h1>
                    soma.
                </h1>
                <ul>
                    <li>
                        <Link to='/terms'>
                            Terms Of Service
                        </Link>
                    </li>
                    <li>
                        <Link to='/dmca'>
                            DMCA
                        </Link>
                    </li>
                </ul>
                <p>
                    The website does not host any files on its server. Instead, it provides links to media content that are hosted on third-party services.
                </p>
                <p className='copyright'>
                    <span>&copy; soma.</span> | <span>2023</span>
                </p>
            </div>
        </section>
    )
}

export default Footer
