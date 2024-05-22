import ToggleTheme from "../ToggleTheme/ToggleTheme"
import s from "./Header.module.scss"

type Props = {
  isDark: boolean
  setIsDark: (value: boolean) => void
}
const Header = ({isDark, setIsDark}: Props) => {
  return (
    <header className={s.header}>
      <h1>Memegram</h1>
      <ToggleTheme isDark={isDark} setIsDark={setIsDark} />
    </header>
  )
}

export default Header
