import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import React from 'react'
import LogementCSS from './Form.module.css'
import { useRef, useState, useEffect } from 'react'
import axios from '../api/ApiKasaMongoDB'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import { useContext } from 'react'

const LOGEMENT_POST_URL = '/api/logements'

const FormLogement = () => {
  const { auth } = useContext(AuthContext)

  const userId = auth.userId

  const userRef = useRef()
  const errRef = useRef()

  const [title, setTitle] = useState('')

  const [description, setDescription] = useState('')

  const [location, setLocation] = useState('')

  const [equipements, setEquipements] = useState([])
  const [equipementsFocus, setEquipementsFocus] = useState(false)

  const [tags, setTags] = useState([])
  const [tagsFocus, setTagsFocus] = useState(false)

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
    let pictures = document.getElementById('pictures').files

    formData.append('image', cover)

    for (let i = 0; i < pictures.length; i++) {
      formData.append('pictures', pictures[i])
    }

    formData.append('logement', [
      JSON.stringify({
        userId,
        title,
        description,
        location,
        equipements,
        tags,
      }),
    ])
    try {
      const response = await axios.post(LOGEMENT_POST_URL, formData, {
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
          <div className={LogementCSS.bgSection}>
            <div className={LogementCSS.sectionSignUp}>
              <h1> Logement créé ! </h1>
              <p>
                <Link
                  className={LogementCSS.aReg}
                  to={`/profile/${auth.userId}`}
                >
                  {' '}
                  Revenir au profil{' '}
                </Link>
              </p>
            </div>
          </div>
        ) : (
          <div className={LogementCSS.bgSection}>
            <div className={LogementCSS.sectionSignUp}>
              <p
                ref={errRef}
                className={errMsg ? LogementCSS.errMsg : LogementCSS.offscreen}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <h1>Créer un logement</h1>
              <p>
                <Link
                  className={LogementCSS.aReg}
                  to={`/profile/${auth.userId}`}
                >
                  {' '}
                  Revenir au profil{' '}
                </Link>
              </p>
              <form onSubmit={handleSubmit}>
                <label htmlFor="text">Titre&nbsp;:</label>
                <input
                  type="text"
                  id="title"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  required
                />
                <label htmlFor="text">Lieu&nbsp;:</label>
                <input
                  type="text"
                  id="location"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                  required
                />
                <label htmlFor="text">Description&nbsp;:</label>
                <textarea
                  type="text"
                  id="description"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                />
                <label htmlFor="text">Équipements&nbsp;:</label>
                <input
                  type="text"
                  id="équipements"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setEquipements(e.target.value.split(','))}
                  value={equipements}
                  required
                  aria-describedby="uidnote"
                  onFocus={() => setTagsFocus(true)}
                  onBlur={() => setTagsFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    tagsFocus && tags
                      ? LogementCSS.instructions
                      : LogementCSS.offscreen
                  }
                >
                  ⚠ Merci de séparer les differents équipements par des virgules
                </p>
                <label htmlFor="text">Tags&nbsp;:</label>
                <input
                  type="text"
                  id="tags"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setTags(e.target.value.split(','))}
                  value={tags}
                  required
                  aria-describedby="uidnote"
                  onFocus={() => setEquipementsFocus(true)}
                  onBlur={() => setEquipementsFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    equipementsFocus && equipements
                      ? LogementCSS.instructions
                      : LogementCSS.offscreen
                  }
                >
                  ⚠ Merci de séparer les differents tags par des virgules
                </p>
                <label htmlFor="image">Image de présentation&nbsp;:</label>
                <input
                  accept="image/png, image/jpeg, image/jpg"
                  name="image"
                  type="file"
                  id="image"
                  ref={userRef}
                  required
                />
                <label htmlFor="image">
                  Photos de votre logement (8 max)&nbsp;:
                </label>
                <input
                  accept="image/png, image/jpeg, image/jpg"
                  multiple
                  name="pictures"
                  type="file"
                  id="pictures"
                  ref={userRef}
                  required
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
