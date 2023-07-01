import { Link } from 'react-router-dom'
import '../assets/css/footer.css'

const Footer = () => {
    return (
        <section id='footer' className='footer'>
            <div className='container container__footer'>
                <Link to='/'>
                    <h1>
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
