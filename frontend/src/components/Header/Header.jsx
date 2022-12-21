import { Link } from 'react-router-dom'
import Logo from '../../assets/logoHeader.svg'
import CssHeader from './Header.module.css'
import { useLocation } from 'react-router-dom'

import AuthContext from '../../context/AuthProvider'
import { useContext } from 'react'

import { useParams } from 'react-router-dom'

import { useState } from 'react'

function Header() {
  const { auth, setAuth } = useContext(AuthContext) // on va l'utiliser pour savoir si l'utilisateur est connecté ou

  const signOut = () => {
    setAuth({})
    console.log('----> userId et token supprimés du contexte')
    console.log(auth.data)
  }

  const urlId = useParams().id // récupération de l'id dans l'url

  const path = useLocation().pathname // on utilise ce hook pour savoir ou l'on se trouve
  const location = path

  const [showBurger, setShowBurger] = useState(false)

  const handleShowBurger = () => {
    setShowBurger(!showBurger)
  }

  return (
    <header className={CssHeader.header}>
      <img src={Logo} alt="Logo de Kasa" className={CssHeader.logoHeader} />
      {(location === '/home' && auth.token && auth.userId) ||
      (location === '/about' && auth.token && auth.userId) ||
      (location === `/profile/${urlId}` && auth.token && auth.userId) ||
      (location === `/lodgings/${urlId}` && auth.token && auth.userId) ||
      (location === '/formlogement' && auth.token && auth.userId) ||
      (location === `/updateformlogement/${urlId}` &&
        auth.token &&
        auth.userId) ||
      (location === `/deleteformlogement/${urlId}` &&
        auth.token &&
        auth.userId) ||
      (location === `/formprofile/${urlId}` && auth.token && auth.userId) ? (
        <>
          <nav
            className={`${CssHeader.navHeader} ${
              showBurger ? CssHeader.showBurger : CssHeader.hideNav
            }`}
          >
            <Link
              to="/home"
              className={CssHeader.navHome}
              onClick={handleShowBurger}
            >
              Accueil
            </Link>
            <Link
              to="/about"
              className={CssHeader.navAbout}
              onClick={handleShowBurger}
            >
              À propos
            </Link>
            <Link
              to={`/profile/${auth.userId}`}
              className={CssHeader.navHome}
              onClick={handleShowBurger}
            >
              Mon profil
            </Link>
            <Link to="/" className={CssHeader.navHome} onClick={signOut}>
              Se deconnecter
            </Link>
          </nav>
          <button className={CssHeader.burgerBtn} onClick={handleShowBurger}>
            <span
              className={`${CssHeader.burgerBar} ${
                showBurger ? CssHeader.showBurger : CssHeader.hideNav
              }`}
            ></span>
          </button>
        </>
      ) : location === '' || location === '/' ? (
        <>
          <nav
            className={`${CssHeader.navHeader} ${
              showBurger ? CssHeader.showBurger : CssHeader.hideNav
            }`}
          >
            <Link
              to="/home"
              className={CssHeader.navHome}
              onClick={handleShowBurger}
            >
              Accueil
            </Link>
            <Link
              to="/about"
              className={CssHeader.navAbout}
              onClick={handleShowBurger}
            >
              À propos
            </Link>
          </nav>
          <button className={CssHeader.burgerBtn} onClick={handleShowBurger}>
            <span
              className={`${CssHeader.burgerBar} ${
                showBurger ? CssHeader.showBurger : CssHeader.hideNav
              }`}
            ></span>
          </button>
        </>
      ) : (
        <>
          <nav
            className={`${CssHeader.navHeader} ${
              showBurger ? CssHeader.showBurger : CssHeader.hideNav
            }`}
          >
            <Link to="/" className={CssHeader.navHome}>
              Se connecter
            </Link>
            <Link
              to="/home"
              className={CssHeader.navHome}
              onClick={handleShowBurger}
            >
              Accueil
            </Link>
            <Link
              to="/about"
              className={CssHeader.navAbout}
              onClick={handleShowBurger}
            >
              À propos
            </Link>
          </nav>
          <button className={CssHeader.burgerBtn} onClick={handleShowBurger}>
            <span
              className={`${CssHeader.burgerBar} ${
                showBurger ? CssHeader.showBurger : CssHeader.hideNav
              }`}
            ></span>
          </button>
        </>
      )}
    </header>
  )
}

export default Header
