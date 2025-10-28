import React, { createContext, useEffect, useState } from 'react'

const ThemeContext = createContext();

//get from localstorage
const getTheme = () => {
    const theme = localStorage.getItem("theme");
    if (!theme) {
        localStorage.setItem("theme", "light-theme")
        return "light-theme"
    } else {
        return theme
    }
}

function Theme({ children }) {
    //setting theme
    const [theme, setTheme] = useState(getTheme);

    function toggleTheme() {
        if (theme === "dark-theme") {
            setTheme("light-theme")
        } else {
            setTheme("dark-theme")
        }
    }

    //updating theme
    useEffect(() => {
        const refreshTheme = () => {
            localStorage.setItem("theme", theme)
        }
        refreshTheme()
    }, [theme]) //based on theme change it should apply theme

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, Theme }
