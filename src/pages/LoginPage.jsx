import { Link, useNavigate } from "react-router-dom"
import Login from "../components/Login"
import login from '../assets/login.jpg'

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
