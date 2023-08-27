import { useState } from 'react'
import '../styles/form.css'
import { Link, useNavigate } from 'react-router-dom'
import useAuthContext from '../context/AuthContext';
import { AiOutlineUser } from 'react-icons/ai'
import { BiSolidLock } from 'react-icons/bi'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa'

const Login = () => {
    const [ showPassword, setShowPassword ] = useState(false);
    const navigate = useNavigate();
    const { 
        loginUser, 
        updateLoginInfo, 
        loginError, 
        loginInfo, 
        isLoginLoading,
        user
    } = useAuthContext();
    
    if(user) {
        navigate('/')
    }

    const handleShowPassword = () => {
        setShowPassword(prev => !prev)
    }

    return (
        <div className='form__container'>
            <h2>
                Sign in
            </h2>
            <form
                className='__form'
                onSubmit={loginUser}
                autoComplete="on"
            >
                <label>
                    <input type="text" required
                        placeholder='Username or Email address'
                        autoComplete="username"
                        onChange={e => updateLoginInfo({
                            ...loginInfo,
                            identifier: e.target.value
                        })}
                    />
                    <AiOutlineUser className='input__icon'/>
                </label>
                <label>
                    <input type={`${showPassword ? 'text' : 'password'}`} 
                        required
                        placeholder='Password'
                        autoComplete="password"
                        onChange={e => updateLoginInfo({
                            ...loginInfo,
                            password: e.target.value
                        })}
                    />
                    <BiSolidLock className='input__icon'/>
                    <FaRegEye
                        className={`eye__icon ${showPassword ? 'd-none' : ''}`}
                        onClick={handleShowPassword}
                    />
                    <FaRegEyeSlash
                        className={`eye__icon ${showPassword ? '' : 'd-none'}`}
                        onClick={handleShowPassword}
                    />
                </label>
                <button 
                    type='submit'
                    className='btn btn-primary form__button'
                    disabled={isLoginLoading}
                >
                {
                    isLoginLoading 
                    ? 'Signing in...'
                    : 'Sign in'
                }
                    
                </button>
            </form>
            <p>
                If you still dont have an account
                <br />
                <Link 
                    to='/register'
                    className='sign__up'
                >
                    Sign Up Now!
                </Link>
            </p>
            {
                loginError?.error &&
                <span className='error__message'>
                    {loginError?.message}
                </span>
            }
        </div>
    )
}

export default Login
