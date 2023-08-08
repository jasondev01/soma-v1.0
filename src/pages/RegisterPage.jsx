import { Link, useNavigate } from "react-router-dom"
import register from '../assets/register.jpg'
import Register from "../components/Register"

const RegisterPage = () => {

    return (
        <>
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
