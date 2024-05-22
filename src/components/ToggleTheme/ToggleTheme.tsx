"use client"

import React from "react"
import { useTheme } from "../ThemeContext/ThemeContext"
import s from "./ToggleTheme.module.scss"

const ToggleTheme = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={s.toggleContainer}>
      <input
        type="checkbox"
        id="check"
        className={s.toggle}
        onChange={toggleTheme}
        checked={theme === "light" ? true : false}
      />
      <label className={s.label} htmlFor="check">{theme === "light" ? "Dark" : "Light"} mode</label>
    </div>
  )
}

export default ToggleTheme
