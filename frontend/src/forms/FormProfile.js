import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import React from 'react'
import ProfileCSS from './Form.module.css'
import { useRef, useState, useEffect } from 'react'
import axios from '../api/ApiKasaMongoDB'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import { useContext } from 'react'

import { useParams } from 'react-router-dom'

import useUsersService from '../services/usersService'

const FormProfile = () => {
  const { auth } = useContext(AuthContext)
  // console.log(auth.userId, auth.token)

  const userId = useParams().id
  const PROFILE_PUT_URL = `/api/users/${userId}`

  const userRef = useRef()
  const errRef = useRef()

  const [fullName, setFullName] = useState('')
  const [hostDescription, setHostDescription] = useState('')

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  const usersService = useUsersService()

  const [dataUser, setdataUser] = useState({
    _id: '',
    email: '',
    fullName: '',
    profilePict: '',
    hostDescription: '',
  })

  // données de l'hébergeur
  useEffect(() => {
    const getDataUser = async () => {
      try {
        const user = await usersService.getUserById(userId)
        setdataUser(user)
        setFullName(user.fullName)
        setHostDescription(user.hostDescription)
      } catch (err) {
        if (err.response) {
          // not in the 200 response range
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        } else {
          console.log(`Error: ceci est une erreur`)
        }
      }
    }
    getDataUser()
  }, []) // array vide sinon boucle infinie (warning esLint)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [hostDescription])

  const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    let profilePict = document.getElementById('image').files[0]

    if (profilePict) {
      formData.append('image', profilePict)
    }

    formData.append('user', [
      JSON.stringify({
        fullName,
        hostDescription,
      }),
    ])
    try {
      const response = await axios.put(PROFILE_PUT_URL, formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })

      console.log(response.data)
      setSuccess(true)
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Le serveur ne réponds pas')
      } else {
        setErrMsg('Édition de profil échoué')
      }
      errRef.current.focus()
    }
  }

  return (
    <div className="mainContainer">
      <div className="container">
        <Header />
        {auth.userId && auth.token && (
          <>
            {success ? (
              <div className={ProfileCSS.bgSection}>
                <div className={ProfileCSS.sectionSignUp}>
                  <h1> Profil Edité ! </h1>
                  <p>
                    <Link
                      className={ProfileCSS.aReg}
                      to={`/profile/${auth.userId}`}
                    >
                      {' '}
                      Revenir au profil{' '}
                    </Link>
                  </p>
                </div>
              </div>
            ) : (
              <div className={ProfileCSS.bgSection}>
                <div className={ProfileCSS.sectionSignUp}>
                  <p
                    ref={errRef}
                    className={
                      errMsg ? ProfileCSS.errMsg : ProfileCSS.offscreen
                    }
                    aria-live="assertive"
                  >
                    {errMsg}
                  </p>
                  <h1>Éditer votre profil</h1>
                  <p>
                    <Link
                      className={ProfileCSS.aReg}
                      to={`/profile/${auth.userId}`}
                    >
                      {' '}
                      Revenir au profil{' '}
                    </Link>
                  </p>
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="text">Nom d'utilisateur&nbsp;:</label>
                    <input
                      // readOnly (si on ne veut pas que l'user change son nom)
                      type="text"
                      name="fullName"
                      id="fullName"
                      ref={userRef}
                      autoComplete="off"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                    <label htmlFor="text">
                      {' '}
                      Message de présentation&nbsp;:
                    </label>
                    <textarea
                      className={ProfileCSS.textAreaSize}
                      type="text"
                      name="hostDescription"
                      id="hostDescription"
                      ref={userRef}
                      autoComplete="off"
                      value={hostDescription}
                      onChange={(e) => setHostDescription(e.target.value)}
                      required
                    />
                    <label htmlFor="image"> Photo de profil&nbsp;:</label>
                    <input
                      accept="image/png, image/jpeg, image/jpg"
                      name="image"
                      type="file"
                      id="image"
                      ref={userRef}
                      required
                    />
                    <button>Valider</button>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default FormProfile
