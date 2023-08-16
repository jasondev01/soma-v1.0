import Login from "../components/Login"
import login from '../assets/login.webp'
import { Helmet } from "react-helmet"

const LoginPage = () => {
    
    return (
        <>
        
        <main 
            style={{
                height: '100vh',
                background: `url(${login})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}
            className="login__register"
        >
            <Helmet>
                <title>soma - Login </title>
                <meta 
                    name='description' 
                    content="soma's Login Page"
                />
                <meta property="og:image" content={login} />
            </Helmet>
            <div 
                className="container"
                style={{
                    margin: "10px auto"
                }}
            >
                <Login />
            </div>
        </main>
        </>
    )
}

export default LoginPage
