import { Link } from 'react-router-dom'
import '../styles/footer.css'

const Footer = () => {
    return (
        <section id='footer' className='footer'>
            <div className='container container__footer'>
                <h1>
                    soma
                </h1>
                <p>
                    &copy; designed and built by jsn. | <span>2023</span>
                </p>
            </div>
        </section>
    )
}

export default Footer
