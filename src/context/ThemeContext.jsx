import React, { createContext, useState, useEffect, useContext } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(true);

    const toggleTheme = () => {
        setTheme((prevTheme) => !prevTheme);
    };

    useEffect(() => {
        if (theme) {
            document.body.style.backgroundColor = 'var(--primary-bg)';
            document.body.style.color = 'var(--primary)';
        } else {
            document.body.style.backgroundColor = 'rgb(228, 228, 228)';
            document.body.style.color = 'var(--primary-bg)';
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default function useThemeContext() {
    return useContext(ThemeContext)
}
