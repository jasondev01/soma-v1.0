import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { ApiProvider } from './context/ApiContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider>
            <ApiProvider>
                <App />
            </ApiProvider>
        </ThemeProvider>
    </React.StrictMode>,
)
