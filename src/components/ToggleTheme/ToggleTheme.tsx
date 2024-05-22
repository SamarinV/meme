"use client"

import s from "./ToggleTheme.module.scss"

type Props = {
  isDark: boolean
  setIsDark: (value: boolean) => void
}

const ToggleTheme = ({ isDark, setIsDark }: Props) => {
  return (
    <div className={s.toggleContainer}>
      <input
        type="checkbox"
        id="check"
        className={s.toggle}
        onChange={() => setIsDark(!isDark)}
        checked={isDark ? true : false}
      />
      <label className={s.label} htmlFor="check">
        {isDark ? "Dark" : "Light"} theme
      </label>
    </div>
  )
}

export default ToggleTheme
