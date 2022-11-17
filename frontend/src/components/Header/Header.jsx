import { Link } from 'react-router-dom'
import Logo from '../../assets/logoHeader.svg'
import CssHeader from './Header.module.css'
import { useLocation } from 'react-router-dom'

function Header() {
  const path = useLocation().pathname // on utilise ce hook pour savoir ou l'on se trouve
  const location = path.split('/P7_Kasa_React')[1]

  return (
    <header className={CssHeader.header}>
      <img src={Logo} alt="Logo de Kasa" className={CssHeader.logoHeader} />
      {location === '/home' ? (
        <>
          <nav className={CssHeader.navHeader}>
            <Link to="/P7_Kasa_React/" className={CssHeader.navHome}>
              Se connecter
            </Link>
          </nav>
          <nav className={CssHeader.navHeader}>
            <Link to="/P7_Kasa_React/home" className={CssHeader.navHome}>
              Accueil
            </Link>
            <Link to="/P7_Kasa_React/about" className={CssHeader.navAbout}>
              À propos
            </Link>
          </nav>
        </>
      ) : (
        <nav className={CssHeader.navHeader}>
          <Link to="/P7_Kasa_React/home" className={CssHeader.navHome}>
            Accueil
          </Link>
          <Link to="/P7_Kasa_React/about" className={CssHeader.navAbout}>
            À propos
          </Link>
        </nav>
      )}
    </header>
  )
}

export default Header
