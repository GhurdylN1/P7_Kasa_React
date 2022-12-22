import { useRef, useState, useEffect } from 'react'
import React from 'react'
import SignUpCSS from './Form.module.css'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { Link } from 'react-router-dom'
import axios from '../api/ApiKasaMongoDB'

const EMAIL_REGEX = /^[a-zA-Z0-9-_.]+@{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,4}$/
const USERNAME_REGEX =
  /^[A-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ][A-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ'0-9-_ ]{2,}$/
const PASSWORD_REGEX =
  /^(?!.* )(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]{2})(?=.*[!@#$%]).{6,15}$/

const SIGNUP_URL = '/api/auth/signup/'

const SignUp = () => {
  const userRef = useRef()
  const errRef = useRef()

  const [userName, setUserName] = useState('')
  const [valideUserName, setValidUserName] = useState(false)
  const [userNameFocus, setUserNameFocus] = useState(false)

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
    setValidUserName(USERNAME_REGEX.test(userName))
  }, [userName])

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
    const fullName = userName // pour corespondre au champ fullName attendu par le Backend
    // si le bouton est activé par un hack
    const v1 = EMAIL_REGEX.test(email)
    const v2 = USERNAME_REGEX.test(userName)
    const v3 = PASSWORD_REGEX.test(password)
    if (!v1 || !v2 || !v3) {
      setErrMsg('Invalid Entry')
      return
    }
    try {
      const response = await axios.post(
        SIGNUP_URL,
        JSON.stringify({ email, fullName, password }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      console.log(response.data)
      setSuccess(true)
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
                <Link className={SignUpCSS.aReg} to="/">
                  {' '}
                  Se connecter{' '}
                </Link>
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
                  Email&nbsp;:
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

                <label htmlFor="username">
                  Nom d'utilisateur&nbsp;:
                  <span
                    className={
                      valideUserName ? SignUpCSS.valid : SignUpCSS.hide
                    }
                  >
                    ✔
                  </span>
                  <span
                    className={
                      valideUserName || !userName
                        ? SignUpCSS.hide
                        : SignUpCSS.invalid
                    }
                  >
                    ❌
                  </span>
                </label>
                <input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  required
                  aria-invalid={
                    valideUserName ? SignUpCSS.false : SignUpCSS.true
                  }
                  aria-describedby="uidnote"
                  onFocus={() => setUserNameFocus(true)}
                  onBlur={() => setUserNameFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    userNameFocus && userName && !valideUserName
                      ? SignUpCSS.instructions
                      : SignUpCSS.offscreen
                  }
                >
                  ⚠ 3 lettres minimum.
                  <br />
                  Doit commencer par une lettre.
                  <br />
                  Lettres, chiffres, <span aria-label="underscore">_</span>{' '}
                  <span aria-label="hyphen">-</span> et espaces acceptés.
                </p>

                <label htmlFor="password">
                  Mot de passe&nbsp;:
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
                  Confirmer le mot de passe&nbsp;:
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
                <span className={SignUpCSS.line}>
                  <Link className={SignUpCSS.aReg} to="/">
                    {' '}
                    Se connecter{' '}
                  </Link>
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
