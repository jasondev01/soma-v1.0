import { useContext, createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest, secretKey, } from "../utilities/service";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [ user, setUser ] = useState(null);
    const [ registerError, setRegisterError ] = useState(null);
    const [ isRegisterLoading, setIsRegisterLoading ] = useState(false);
    const [ loginError, setLoginError ] = useState(null);
    const [ isLoginLoading, setIsLoginLoading ] = useState(false);
    const [ isUpdateProfileError, setIsUpdateProfileError ] = useState(null);
    const [ errorUpdateMessage, setErrorUpdateMessage ] = useState(null);
    const [ isUpdateProfileLoading, setIsUpdateProfileLoading ] = useState(false);
    const [ userCount, setUserCount ] = useState();


    const [ registerInfo, setRegisterInfo ] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [ loginInfo, setLoginInfo ] = useState({
        password: ""
    });

    useEffect(() => {
        const user = localStorage.getItem("User")
        setUser(JSON.parse(user))
    }, [])

    // Register setRegisterInfo 
    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    // login setLoginInfo
    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);

    // register
    const registerUser = useCallback(async(e) => {
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegisterError(null);

        const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo));

        setIsRegisterLoading(false);

        if (response.error) {
            return setRegisterError(response);
        }

        localStorage.setItem("User", JSON.stringify(response)) // storing user to local storate
        setUser(response); // storing user to state
    }, [registerInfo]);

    // login
    const loginUser = useCallback(async(e)=> {
        e.preventDefault();
        setIsLoginLoading(true);
        setLoginError(null);

        const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo));
        
        setIsLoginLoading(false);

        if (response.error) {
            return setLoginError(response);
        }

        localStorage.setItem("User", JSON.stringify(response))
        setUser(response)
    }, [loginInfo])

    // logout
    const logoutUser = useCallback(() => {
        localStorage.removeItem("User");
        setUser(null);
        setUserCount(null)
    }, []);

    // add bookmark
    const addBookmark = useCallback(async (slug, title, image, currentEpisode ) => {
        if (user) {
            const { _id } = user;
            const response = await postRequest(`${baseUrl}/users/add-bookmark`, JSON.stringify({ userId: _id, slug, title, image, currentEpisode}));
            if (!response.error) {
                setUser(response);
                const updatedUser = { ...user, bookmarked: response.bookmarked };
                localStorage.setItem('User', JSON.stringify(updatedUser));
            }
        }
    }, [user]);

    // remove bookmark
    const removeBookmark = useCallback(async (slug) => {
        if (user) {
            const { _id } = user;
            const response = await postRequest(`${baseUrl}/users/remove-bookmark`, JSON.stringify({ userId: _id, slug }));
            if (!response.error) {
                setUser(response);
                const updatedUser = { ...user, bookmarked: response.bookmarked };
                localStorage.setItem('User', JSON.stringify(updatedUser));
            }
        }
    }, [user]);

    // add a watched item
    const addWatchedItem = useCallback(async (title, slug, image, episodeId, episodeNumber, date) => {
        if (user) {
            const { _id } = user;
            const response = await postRequest(`${baseUrl}/users/add-watched`, JSON.stringify({ userId: _id, title, slug, image, episodeId, episodeNumber, date }));
            if (!response.error) {
                setUser(response);
                const updatedUser = { ...user, watched: response.watched };
                localStorage.setItem('User', JSON.stringify(updatedUser));
            }
        }
    }, [user]);

    // remove a watched item
    const removeWatchedItem = useCallback(async (watchedItemId) => {
        if (user) {
            const { _id } = user;
            const response = await postRequest(`${baseUrl}/users/remove-watched`, JSON.stringify({ userId: _id, watchedItemId }));
            if (!response.error) {
                setUser(response);
                const updatedUser = { ...user, watched: response.watched };
                localStorage.setItem('User', JSON.stringify(updatedUser));
            }
        }
    }, [user]);

    // remove all watched items
    const removeAllWatchedItems = useCallback(async () => {
        if (user) {
            const { _id } = user;
            const response = await postRequest(`${baseUrl}/users/delete-watched-list`, JSON.stringify({ userId: _id }));
            if (!response.error) {
                setUser(response);
                const updatedUser = { ...user, watched: response.watched };
                localStorage.setItem('User', JSON.stringify(updatedUser));
            }
        }
    }, [user]);

    // update profile
    const updateProfile = useCallback(async (formData) => {
        setIsUpdateProfileLoading(true);
        setIsUpdateProfileError(false);
        if (user) {
            const { _id } = user;
            const { image, wallpaper, username, nickname, toggleNews } = formData;
            const response = await postRequest(`${baseUrl}/users/update-profile`, JSON.stringify({ userId: _id, image, wallpaper, username, nickname, toggleNews }));
            if (!response.error) {
                const updatedUser = {
                    ...user,
                    profile: response.user.profile,
                };
                setUser(updatedUser);
                setIsUpdateProfileLoading(false);
                localStorage.setItem('User', JSON.stringify(updatedUser));
            } else {
                console.log(response)
                setIsUpdateProfileLoading(false);
                setIsUpdateProfileError(true);
                setErrorUpdateMessage(response.message)
            }
        }
    }, [user]);

    // get count of all the user -> admin right
    const getCount = useCallback(async () => {
        if (user) {
            const { _id, email } = user;
            const response = await postRequest(`${baseUrl}/users/user-count`, JSON.stringify({ userId: _id, email, secretKey }));
            if (!response.error) {
                setUserCount(response)
            } else {
                return console.log(response.error);
            }
        }
    }, [user]);

    return (
        <AuthContext.Provider 
            value={{
                user,
                // Register user
                registerInfo,
                updateRegisterInfo,
                registerUser,
                registerError,
                isRegisterLoading,
                // Logout user
                logoutUser,
                // login user
                loginUser,
                updateLoginInfo,
                loginError,
                loginInfo,
                isLoginLoading,
                // bookmark
                addBookmark,
                removeBookmark,
                // watched
                addWatchedItem,
                removeWatchedItem,
                // update profile
                isUpdateProfileLoading,
                isUpdateProfileError,
                errorUpdateMessage,
                updateProfile,
                //get users count
                getCount,
                userCount
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuthContext() {
    return useContext(AuthContext)
}