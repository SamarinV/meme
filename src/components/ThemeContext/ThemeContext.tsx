"use client"

import { ReactNode, createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext({
  theme: "",
  toggleTheme: () => {},
})

type Props = {
  children: ReactNode
}
export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"))

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(theme)
      document.documentElement.setAttribute("theme", savedTheme)
    } else {
      const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(prefersDarkScheme ? "dark" : "light")
    }
  }, [])

  useEffect(() => {
    console.log(theme)
    if (theme) {
      document.documentElement.setAttribute("theme", theme)
      localStorage.setItem("theme", theme)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }
  if (theme === null) {
    return
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
