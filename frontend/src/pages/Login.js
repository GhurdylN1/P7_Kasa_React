import { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import axios from '../api/ApiKasaMongoDB'
import React from 'react'
import LoginCSS from './Sign.module.css'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { Link } from 'react-router-dom'

const LOGIN_URL = '/api/auth/login/'

const Login = () => {
  const { setAuth } = useContext(AuthContext)

  const userRef = useRef()
  const errRef = useRef()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: false,
        }
      )
      console.log(JSON.stringify(response?.data))
      //   const accessToken = response?.data?.accessToken
      //   const roles = response?.data?.roles
      //   setAuth({ email, password, roles, accessToken })
      const token = response?.data?.token
      const userId = response?.data?.userId
      setAuth({ email, password, userId, token })
      setEmail('')
      setPassword('')
      setSuccess(true)
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Le serveur ne réponds pas')
      } else if (err.response?.status === 401) {
        setErrMsg('Email et/ou mot de passe incorrect')
      } else {
        setErrMsg('Connexion échouée')
      }
      errRef.current.focus()
    }
  }

  return (
    <div className="mainContainer">
      <div className="container">
        <Header />
        {success ? (
          <div className={LoginCSS.bgSection}>
            <div className={LoginCSS.sectionSignUp}>
              <h1> Connexion réussie </h1>
              <p>
                <Link className={LoginCSS.aReg} to="/P7_Kasa_React/home">
                  {' '}
                  Bonne visite !{' '}
                </Link>
              </p>
            </div>
          </div>
        ) : (
          <div className={LoginCSS.bgSection}>
            <div className={LoginCSS.sectionSignUp}>
              <p
                ref={errRef}
                className={errMsg ? LoginCSS.errMsg : LoginCSS.offscreen}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <h1>Se Connecter</h1>
              <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                <button>Valider</button>
              </form>
              <p>
                Vous n'avez pas encore de compte ?<br />
                <span className={LoginCSS.line}>
                  <Link className={LoginCSS.aReg} to="/P7_Kasa_React/signup/">
                    {' '}
                    Créer un compte{' '}
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

export default Login
