import { Link } from 'react-router-dom'
import Logo from '../../assets/logoHeader.svg'
import CssHeader from './Header.module.css'
import { useLocation } from 'react-router-dom'

import AuthContext from '../../context/AuthProvider'
import { useContext } from 'react'

import { useParams } from 'react-router-dom'

function Header() {
  const { auth, setAuth } = useContext(AuthContext) // on va l'utiliser pour savoir si l'utilisateur est connecté ou

  const signOut = () => {
    setAuth({})
  }

  const urlId = useParams().id // récupération de l'id dans l'url

  const path = useLocation().pathname // on utilise ce hook pour savoir ou l'on se trouve
  const location = path.split('/P7_Kasa_React')[1]

  return (
    <header className={CssHeader.header}>
      <img src={Logo} alt="Logo de Kasa" className={CssHeader.logoHeader} />
      {(location === '/home' && auth.token && auth.userId) ||
      (location === '/about' && auth.token && auth.userId) ||
      (location === `/profile/${urlId}` && auth.token && auth.userId) ||
      (location === `/lodgings/${urlId}` && auth.token && auth.userId) ? (
        <>
          <nav className={CssHeader.navHeader}>
            <Link
              to="/P7_Kasa_React/"
              className={CssHeader.navHome}
              onClick={signOut}
            >
              Se deconnecter
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
      ) : location === '/' ? (
        <>
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
      )}
    </header>
  )
}

export default Header
