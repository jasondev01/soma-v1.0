import { useState } from 'react';
import useAuthContext from '../context/AuthContext'
import '../styles/settingform.css'
import { useNavigate } from 'react-router-dom';
import { removeHtmlTags } from '../utilities/utility';

const SettingForm = ({user, storedUser}) => {
    const { updateProfile, isUpdateProfileError, isUpdateProfileLoading, } = useAuthContext()
    const [ formData, setFormData ] = useState({
        image: user?.profile?.image || storedUser?.profile?.image,
        wallpaper: user?.profile?.wallpaper || storedUser?.profile?.wallpaper,
        username: user?.profile?.username || storedUser?.profile?.username,
        nickname: user?.profile?.nickname || storedUser?.profile?.nickname,
        toggleNews: false,
    });
    const navigate = useNavigate()
    const [ error, setError ] = useState('');

    // console.log(`formData`, formData.username)

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.username.length < 5 || formData.username.length > 10){
            return setError('Username must be 5-10 characters long')
        } else {
            const cleanUsername = removeHtmlTags(formData.username);
            setFormData(prev => ({...prev, username: cleanUsername}))
        }
        if(formData.nickname.length < 5 || formData.nickname.length > 10){
            return setError('Nickname name must be 3-10 characters long')
        } else {
            const cleanNickname = removeHtmlTags(formData.image);
            setFormData(prev => ({...prev, image: cleanNickname}))
        }
        if(formData.image.length > 200){
            return setError('Image URL is too long')
        } else {
            const cleanImage = removeHtmlTags(formData.nickname);
            setFormData(prev => ({...prev, nickname: cleanImage}))
        }
        if(formData.wallpaper.length > 200){
            return setError('Wallpaper URL is too long')
        } else {
            const cleanWallpaper = removeHtmlTags(formData.wallpaper);
            setFormData(prev => ({...prev, wallpaper: cleanWallpaper}))
        }
        
        console.log(`isUpdateProfileError`, isUpdateProfileError)
        updateProfile(formData);
        navigate('/profile')
    };

    return (
        <div className="container container__setting">
            
            <form className="setting__form"
                onSubmit={handleSubmit}
            >
                <h2>
                    Update your profile
                </h2>
                <div className='form__control'>
                    <label htmlFor="username">Username </label>
                    <input type="text" 
                        id="username" 
                        name="username" 
                        placeholder="loremx.1"
                        value={formData.username}
                        onChange={e => setFormData({ 
                            ...formData, 
                            username: e.target.value
                        })}
                    />
                </div>
                <div className='form__control'>
                    <label htmlFor="nickname">Nickname </label>
                    <input type="text" 
                        id="nickname" 
                        name="nickname" 
                        placeholder="jon"
                        value={formData?.nickname}
                        onChange={e => setFormData({ 
                            ...formData, 
                            nickname: e.target.value
                        })}
                    />
                </div>
                <div className='form__control'> 
                    <label htmlFor="image">Profile image </label>
                    <input type="text" 
                        id='image' 
                        name="image" 
                        placeholder="url: https://image.jpg"
                        value={formData?.image}
                        onChange={e => setFormData({ 
                            ...formData, 
                            image: e.target.value
                        })}
                    />
                </div>
                <div className='form__control'>
                    <label htmlFor="wallpaper">Wallpaper </label>
                    <input type="text" 
                        id='wallpaper' 
                        name="wallpaper" 
                        placeholder="url: https://wallpaper.jpg"
                        value={formData?.wallpaper}
                        onChange={e => setFormData({ 
                            ...formData, 
                            wallpaper: e.target.value 
                        })}
                    />
                </div>
                <button
                    className="btn btn-primary"
                    type='submit'
                >
                {
                    isUpdateProfileLoading
                    ? 'Updating...'
                    : 'Update'
                }
                    
                </button>
                {
                    error !== '' &&
                    <span className='error__message'>
                        {error}
                    </span>
                }
            </form>
        </div>
    )
}

export default SettingForm