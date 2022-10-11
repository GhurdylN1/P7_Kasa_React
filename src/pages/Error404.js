import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import Css404 from './Error404.module.css'

const NotFound = () => {
  return (
    <div>
      <Header />
      <div className={Css404.error404}>
        <h1 className={Css404.h1404}>404</h1>
        <p className={Css404.p404}>
          Oups! La page que vous demandez n'existe pas.
        </p>
        <Link to="/" className={Css404.a404}>
          Retourner sur la page d'accueil
        </Link>
      </div>
      <Footer />
    </div>
  )
}

export default NotFound
