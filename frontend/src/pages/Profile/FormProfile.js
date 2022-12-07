import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import React from 'react'
import SignUpCSS from '../../pages/Sign.module.css'
import { useRef, useState, useEffect } from 'react'
import axios from '../../api/ApiKasaMongoDB'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthProvider'
import { useContext } from 'react'

import { useParams } from 'react-router-dom'

const FormProfile = () => {
  const { auth } = useContext(AuthContext)
  console.log(auth.userId, auth.token)

  const userId = useParams().id
  const PROFILE_PUT_URL = `/api/users/${userId}`

  const userRef = useRef()
  const errRef = useRef()

  // const [fullName, setFullName] = useState('')
  const [hostDescription, setHostDescription] = useState('')

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

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
    console.log(profilePict)

    if (profilePict) {
      formData.append('image', profilePict)
    }

    formData.append('user', [
      JSON.stringify({
        // fullName,
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
      // console.log(JSON.stringify(response))
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
              <div className={SignUpCSS.bgSection}>
                <div className={SignUpCSS.sectionSignUp}>
                  <h1> Profil Edité ! </h1>
                  <p>
                    <Link
                      className={SignUpCSS.aReg}
                      to={`/P7_Kasa_React/profile/${auth.userId}`}
                    >
                      {' '}
                      Revenir au profil{' '}
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
                  <h1>Éditer votre profil</h1>
                  <p>
                    <Link
                      className={SignUpCSS.aReg}
                      to={`/P7_Kasa_React/profile/${auth.userId}`}
                    >
                      {' '}
                      Revenir au profil{' '}
                    </Link>
                  </p>
                  <form onSubmit={handleSubmit}>
                    {/* <label htmlFor="text">Nom d'utilisateur :</label>
                    <input
                      // readOnly
                      // placeholder="Nom d'utilisateur"
                      type="text"
                      name="fullName"
                      id="fullName"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => setFullName(e.target.value)}
                      value={fullName}
                      required
                    /> */}
                    <label htmlFor="text"> Message de présentation :</label>
                    <textarea
                      className={SignUpCSS.textAreaSize}
                      type="text"
                      name="hostDescription"
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
