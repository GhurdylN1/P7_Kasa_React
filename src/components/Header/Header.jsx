import { Link } from 'react-router-dom'
import Logo from '../../assets/logoHeader.svg'
import CssHeader from './Header.module.css'

function Header() {
  return (
    <header className={CssHeader.header}>
      <img src={Logo} alt="Logo de Kasa" className={CssHeader.logoHeader} />
      <nav className={CssHeader.navHeader}>
        <Link to="/P7_Kasa_React" className={CssHeader.navHome}>
          Accueil
        </Link>
        <Link to="/P7_Kasa_React/about" className={CssHeader.navAbout}>
          A Propos
        </Link>
      </nav>
    </header>
  )
}

export default Header
