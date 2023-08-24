import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { ApiProvider } from './context/ApiContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { inject } from '@vercel/analytics';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthContextProvider>
            <ThemeProvider>
                <ApiProvider>
                    <App />
                </ApiProvider>
            </ThemeProvider>
        </AuthContextProvider>
    </React.StrictMode>,
)

inject();