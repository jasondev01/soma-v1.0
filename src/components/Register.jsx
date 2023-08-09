import React from 'react'
import '../styles/form.css'
import { Link, useNavigate } from 'react-router-dom'
import useAuthContext from '../context/AuthContext';

const Register = () => {
    const navigate = useNavigate()
    const { 
        registerInfo, 
        updateRegisterInfo, 
        registerUser, 
        registerError, 
        isRegisterLoading,
        user
    } = useAuthContext();

    if(user) {
        navigate('/profile')
    } 

    return (
        <div className='form__container'>
            <h2>
                Sign up
            </h2>
            <form
                className='__form'
                onSubmit={registerUser}
            >
                <label>
                    <input type="text" required
                        placeholder='Full name'
                        onChange={e => updateRegisterInfo({
                            ...registerInfo,
                            name: e.target.value
                        })}
                    />
                </label>
                <label>
                    <input type="text" required 
                        placeholder='Email address'
                        onChange={e => updateRegisterInfo({
                            ...registerInfo,
                            email: e.target.value
                        })}
                    />
                </label>
                <label>
                    <input type="password" required
                        placeholder='Password'
                        onChange={e => updateRegisterInfo({
                            ...registerInfo,
                            password: e.target.value
                        })}
                    />
                </label>
                <button 
                    type='submit'
                    className='btn btn-primary form__button'
                    style={{
                        pointerEvents: isRegisterLoading 
                        ? 'none'
                        : ''
                    }}
                >
                    {
                        isRegisterLoading 
                        ? 'Creating your account...'
                        : 'Sign up'
                    }
                </button>
            </form>
            <p>
                You already have an account?
                <br />
                <Link 
                    to='/login'
                    className='sign__up'
                >
                    Sign In Now!
                </Link>
            </p>
            {
                registerError?.error &&
                <span className='error__message'>
                    {registerError?.message}
                </span>
            }
        </div>
    )
}

export default Register
