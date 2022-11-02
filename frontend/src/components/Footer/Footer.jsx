import React from 'react'
import Logo from '../../assets/logoFooter.svg'
import CssFooter from './Footer.module.css'

function Footer() {
  return (
    <footer className={CssFooter.footer}>
      <img src={Logo} alt="Logo Kasa" className={CssFooter.logoFooter} />
      <p className={CssFooter.textFooter}>© 2020 Kasa. All rights reserved</p>
    </footer>
  )
}

export default Footer
