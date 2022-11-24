import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import React from 'react'
import SignUpCSS from './Sign.module.css'
import { useRef, useState, useEffect } from 'react'
import axios from '../api/ApiKasaMongoDB'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import { useContext } from 'react'

const LOGEMENT_POST_URL = '/api/logements'

const FormLogement = () => {
  const { auth } = useContext(AuthContext)
  console.log(auth.userId, auth.token)

  const userId = auth.userId

  const userRef = useRef()
  const errRef = useRef()

  const [title, setTitle] = useState('')

  const [description, setDescription] = useState('')

  const [location, setLocation] = useState('')

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [title])

  const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    let cover = document.getElementById('image').files[0]
    console.log(cover)

    formData.append('image', cover)

    formData.append('logement', [
      JSON.stringify({
        userId,
        title,
        description,
        location,
      }),
    ])
    try {
      const response = await axios.post(LOGEMENT_POST_URL, formData, {
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
        setErrMsg('Création de logement échoué')
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
              <h1> Logement créé ! </h1>
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
              <h1>Créer un logement</h1>
              <form onSubmit={handleSubmit}>
                <label htmlFor="text">Titre du logement :</label>
                <input
                  type="text"
                  id="title"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  required
                  aria-describedby="uidnote"
                />
                <label htmlFor="text">Description du logement :</label>
                <input
                  type="text"
                  id="description"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                  aria-describedby="uidnote"
                />
                <label htmlFor="text">Lieu du logement :</label>
                <input
                  type="text"
                  id="location"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                  required
                  aria-describedby="uidnote"
                />
                <label htmlFor="image">Image de présentation:</label>
                <input
                  accept="image/png, image/jpeg, image/jpg"
                  multiple
                  name="image"
                  type="file"
                  id="image"
                  ref={userRef}
                  required
                  aria-describedby="uidnote"
                />
                <button>Valider</button>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default FormLogement
