import { useEffect, useState } from 'react';
import useAuthContext from '../context/AuthContext'
import '../styles/settingform.css'
import { useNavigate } from 'react-router-dom';
import { removeHtmlTags } from '../utilities/utility';

const SettingForm = ({user, storedUser}) => {
    const { updateProfile, isUpdateProfileError, isUpdateProfileLoading, errorUpdateMessage} = useAuthContext()
    const navigate = useNavigate()
    const [ message, setMessage ] = useState('');
    const [ error, setError ] = useState(false)
    const [ formData, setFormData ] = useState({
        image: user?.profile?.image || storedUser?.profile?.image,
        wallpaper: user?.profile?.wallpaper || storedUser?.profile?.wallpaper,
        username: user?.profile?.username || storedUser?.profile?.username,
        nickname: user?.profile?.nickname || storedUser?.profile?.nickname,
        toggleNews: false,
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData?.username?.length < 5 || formData?.username?.length > 10){
            return setMessage('Username must be 5-10 characters long')
        } else {
            const cleanUsername = removeHtmlTags(formData.username);
            setFormData(prev => ({...prev, username: cleanUsername}))
        }
        if(formData?.nickname?.length < 3 || formData?.nickname?.length > 20){
            return setMessage('Nickname name must be 3-20 characters long')
        } else {
            const cleanNickname = removeHtmlTags(formData.image);
            setFormData(prev => ({...prev, image: cleanNickname}))
        }
        if(formData?.image?.length > 200){
            return setMessage('Image URL is too long')
        } else {
            const cleanImage = removeHtmlTags(formData?.nickname);
            setFormData(prev => ({...prev, nickname: cleanImage}))
        }
        if(formData?.wallpaper?.length > 200){
            return setMessage('Wallpaper URL is too long')
        } else {
            const cleanWallpaper = removeHtmlTags(formData?.wallpaper);
            setFormData(prev => ({...prev, wallpaper: cleanWallpaper}))
        }

        updateProfile(formData);
        if (isUpdateProfileError) {
            setMessage(errorUpdateMessage)
        } 
    };

    useEffect(() => {
        if (!isUpdateProfileError) {
            navigate('/profile')
        } else {
            setError(isUpdateProfileError)
            setMessage(errorUpdateMessage)
            console.log('message', message)
            setTimeout(() => {
                setError(false)
            }, 2000)
        }
    }, [updateProfile, errorUpdateMessage, user])


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
                    disabled={isUpdateProfileLoading === true || error === true}
                >
                {
                    isUpdateProfileLoading
                    ? 'Updating...'
                    : 'Update'
                }
                    
                </button>
                {
                    message !== '' &&
                    <span className='error__message'>
                        {message}
                    </span>
                }
            </form>
        </div>
    )
}

export default SettingForm