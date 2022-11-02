import { Link } from 'react-router-dom'
import BrandLogo from '../Icons/BrandLogo'
import CssHeader from './Header.module.css'

function Header() {
  return (
    <header className={CssHeader.header}>
      <BrandLogo className={CssHeader.logoHeader} alt="Logo Kasa" />
      <nav className={CssHeader.navHeader}>
        <Link to="/" className={CssHeader.navHome}>
          Accueil
        </Link>
        <Link to="/about" className={CssHeader.navAbout}>
          A Propos
        </Link>
      </nav>
    </header>
  )
}

export default Header
