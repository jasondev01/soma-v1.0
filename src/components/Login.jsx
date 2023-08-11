import React from 'react'
import '../styles/form.css'
import { Link, useNavigate } from 'react-router-dom'
import useAuthContext from '../context/AuthContext';

const Login = () => {
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

    return (
        <div className='form__container'>
            <h2>
                Sign in
            </h2>
            <form
                className='__form'
                onSubmit={loginUser}
            >
                <label>
                    <input type="text" required
                        placeholder='Email address'
                        onChange={e => updateLoginInfo({
                            ...loginInfo,
                            email: e.target.value
                        })}
                    />
                </label>
                <label>
                    <input type="password" required
                        placeholder='Password'
                        onChange={e => updateLoginInfo({
                            ...loginInfo,
                            password: e.target.value
                        })}
                    />
                </label>
                <button 
                    type='submit'
                    className='btn btn-primary form__button'
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
