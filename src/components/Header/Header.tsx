import ToggleTheme from "../ToggleTheme/ToggleTheme"
import s from "./Header.module.scss"

const Header = () => {
  return (
    <header className={s.header}>
      <h1>Memegram</h1>
      <ToggleTheme />
    </header>
  )
}

export default Header
