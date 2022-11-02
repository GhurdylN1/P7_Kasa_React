import React from 'react'
import BrandLogo from '../Icons/BrandLogo'
import CssFooter from './Footer.module.css'

function Footer() {
  return (
    <footer className={CssFooter.footer}>
      <BrandLogo className={CssFooter.logoFooter} />
      <p className={CssFooter.textFooter}>© 2020 Kasa. All rights reserved</p>
    </footer>
  )
}

export default Footer
