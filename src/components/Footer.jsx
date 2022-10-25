import React from 'react'
import { useLocation } from 'react-router-dom'
import Logo from '../assets/logoFooter.svg'
import CssFooter from './Footer.module.css'

function Footer() {
  // meme principe pour Banner ici, mais pour afficher un footer different suivant ou l'on se trouve.
  const path = useLocation().pathname
  const location = path.split('/')[1]

  return (
    <>
      {location === '' ? (
        <footer className={CssFooter.footer}>
          <img src={Logo} alt="Logo Kasa" className={CssFooter.logoFooter} />
          <p className={CssFooter.textFooter}>
            © 2020 Kasa. All rights reserved
          </p>
        </footer>
      ) : (
        <footer className={CssFooter.footerAbout}>
          <img src={Logo} alt="Logo Kasa" className={CssFooter.logoFooter} />
          <p className={CssFooter.textFooter}>
            © 2020 Kasa. All rights reserved
          </p>
        </footer>
      )}
    </>
  )
}

export default Footer
