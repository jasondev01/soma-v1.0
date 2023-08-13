import { Helmet } from 'react-helmet'
import register from '../assets/register.webp'
import Register from "../components/Register"

const RegisterPage = () => {

    return (
        <>
        <Helmet>
            <title>soma - Register </title>
            <meta 
                name='description' 
                content="soma's Register Page"
            />
            <meta property="og:image" content={register} />
        </Helmet>
        <main 
            style={{
                height: '100vh',
                background: `url(${register})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}
            className="login__register"
        >
            <div 
                className="container"
                style={{
                    margin: "10px auto"
                }}
            >
                <Register />
            </div>
        </main>
        </>
    )
}

export default RegisterPage
