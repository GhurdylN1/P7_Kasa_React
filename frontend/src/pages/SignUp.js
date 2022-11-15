import { useRef, useState, useEffect } from 'react'
import React from 'react'
import SignUpCSS from './Sign.module.css'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { Link } from 'react-router-dom'
import axios from '../api/ApiKasaMongoDB'

const EMAIL_REGEX = /^[a-zA-Z0-9-_.]+@{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,4}$/
const PASSWORD_REGEX =
  /^(?!.* )(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{2}(?=.*[!@#$%]).{6,15}$/

const SignUp = () => {
  const userRef = useRef()
  const errRef = useRef()

  const [email, setEmail] = useState('')
  const [validEMail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)

  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)

  const [matchPassword, setMatchPassword] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email))
  }, [email])

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password))
    setValidMatch(password === matchPassword)
  }, [password, matchPassword])

  useEffect(() => {
    setErrMsg('')
  }, [email, password, matchPassword])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // si le bouton est activé par un hack
    const v1 = EMAIL_REGEX.test(email)
    const v2 = PASSWORD_REGEX.test(password)
    if (!v1 || !v2) {
      setErrMsg('Invalid Entry')
      return
    }
    try {
      const response = await axios.post(
        '/api/auth/signup/',
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: false,
        }
      )
      console.log(response.data)
      console.log(JSON.stringify(response))
      setSuccess(true)
      // effacer le formulaire
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Le serveur ne réponds pas')
      } else if (err.response?.status === 409) {
        setErrMsg('Email non valide')
      } else {
        setErrMsg('Création de compte échouée')
      }
      errRef.current.focus()
    }
  }

  return (
    <div className="mainContainer">
      <div className="container">
        <Header />
        {success ? (
          <div className={SignUpCSS.bgSection}>
            <div className={SignUpCSS.sectionSignUp}>
              <h1> Compte créé ! </h1>
              <p>
                <Link to="/P7_Kasa_React/login/"> Se connecter </Link>
              </p>
            </div>
          </div>
        ) : (
          <div className={SignUpCSS.bgSection}>
            <div className={SignUpCSS.sectionSignUp}>
              <p
                ref={errRef}
                className={errMsg ? SignUpCSS.errMsg : SignUpCSS.offscreen}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <h1>Créer un compte</h1>
              <form onSubmit={handleSubmit}>
                <label htmlFor="email">
                  Email:
                  <span
                    className={validEMail ? SignUpCSS.valid : SignUpCSS.hide}
                  >
                    ✔
                  </span>
                  <span
                    className={
                      validEMail || !email ? SignUpCSS.hide : SignUpCSS.invalid
                    }
                  >
                    ❌
                  </span>
                </label>
                <input
                  type="text"
                  id="email"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  aria-invalid={validEMail ? SignUpCSS.false : SignUpCSS.true}
                  aria-describedby="uidnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    emailFocus && email && !validEMail
                      ? SignUpCSS.instructions
                      : SignUpCSS.offscreen
                  }
                >
                  ⚠ Exemple test@test.com
                </p>

                <label htmlFor="password">
                  Mot de passe:
                  <span
                    className={validPassword ? SignUpCSS.valid : SignUpCSS.hide}
                  >
                    ✔
                  </span>
                  <span
                    className={
                      validPassword || !password
                        ? SignUpCSS.hide
                        : SignUpCSS.invalid
                    }
                  >
                    ❌
                  </span>
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-invalid={
                    validPassword ? SignUpCSS.false : SignUpCSS.true
                  }
                  aria-describedby="passwordnote"
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                />
                <p
                  id="passwordnote"
                  className={
                    passwordFocus && password && !validPassword
                      ? SignUpCSS.instructions
                      : SignUpCSS.offscreen
                  }
                >
                  ⚠ 6 à 15 caractères maximum sans espace
                  <br />
                  Doit inclure au moins une lettre majuscule,
                  <br />
                  une lettre minuscule, 2 chiffres et <br />
                  un des caractères spéciaux suivants :{' '}
                  <span aria-label="exclamation mark">!</span>{' '}
                  <span aria-label="at symbol">@</span>{' '}
                  <span aria-label="hashtag">#</span>{' '}
                  <span aria-label="dollar sign">$</span>{' '}
                  <span aria-label="percent">%</span>
                </p>

                <label htmlFor="confirm_password">
                  Confirmer le mot de passe :
                  <span
                    className={
                      validMatch && matchPassword
                        ? SignUpCSS.valid
                        : SignUpCSS.hide
                    }
                  >
                    ✔
                  </span>
                  <span
                    className={
                      validMatch || !matchPassword
                        ? SignUpCSS.hide
                        : SignUpCSS.invalid
                    }
                  >
                    ❌
                  </span>
                </label>
                <input
                  type="password"
                  id="confirm_password"
                  onChange={(e) => setMatchPassword(e.target.value)}
                  required
                  aria-invalid={validMatch ? SignUpCSS.false : SignUpCSS.true}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch
                      ? SignUpCSS.instructions
                      : SignUpCSS.offscreen
                  }
                >
                  ⚠ Doit correspondre avec le mot de passe
                </p>

                <button
                  disabled={
                    !validEMail || !validPassword || !validMatch ? true : false
                  }
                >
                  S'enregistrer
                </button>
              </form>
              <p>
                Vous avez déjà un compte ?<br />
                <span className="line">
                  {/*put router link here*/}
                  <Link to="/P7_Kasa_React/login/"> Se connecter </Link>
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default SignUp
