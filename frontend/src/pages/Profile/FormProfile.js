import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import React from 'react'
import SignUpCSS from '../../pages/Sign.module.css'
import { useRef, useState, useEffect } from 'react'
import axios from '../../api/ApiKasaMongoDB'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthProvider'
import { useContext } from 'react'

const PROFILE_POST_URL = '/api/users'

const FormProfile = () => {
  const { auth } = useContext(AuthContext)
  console.log(auth.userId, auth.token)

  const userId = auth.userId

  const userRef = useRef()
  const errRef = useRef()

  const [fullName, setFullName] = useState('')
  const [hostDescription, setHostDescription] = useState('')

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  return (
    <div className="mainContainer">
      <div className="container">
        <Header />
        <div className={SignUpCSS.bgSection}>
          <div className={SignUpCSS.sectionSignUp}>
            <p
              ref={errRef}
              className={errMsg ? SignUpCSS.errMsg : SignUpCSS.offscreen}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1>Éditer votre profil</h1>
            <form>
              {/* <form onSubmit={handleSubmit}> */}
              <label htmlFor="text">Nom d'utilisateur :</label>
              <input
                type="text"
                id="fullName"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                required
              />
              <label htmlFor="text"> Message de présentation :</label>
              <input
                type="text"
                id="hostDescription"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setHostDescription(e.target.value)}
                value={hostDescription}
                required
              />
              <label htmlFor="image"> Photo de profil :</label>
              <input
                accept="image/png, image/jpeg, image/jpg"
                name="image"
                type="file"
                id="profilePict"
                ref={userRef}
                required
              />
              <button>Valider</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default FormProfile
