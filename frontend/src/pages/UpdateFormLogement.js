import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import React from 'react'
import SignUpCSS from './Sign.module.css'
import { useRef, useState, useEffect } from 'react'
import axios from '../api/ApiKasaMongoDB'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import { useContext } from 'react'

import { useParams } from 'react-router-dom'

const UpdateFormLogement = () => {
  const { auth } = useContext(AuthContext)
  console.log(' ')
  console.log(auth.userId)
  console.log(auth.token)

  const urlId = useParams().id
  const LOGEMENT_PUT_URL = `/api/logements/${urlId}`
  console.log(' ')
  console.log(urlId)

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
    console.log(cover)
    let pictures = document.getElementById('pictures').files
    console.log(pictures)

    if (cover) {
      formData.append('image', cover)
    }

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
      const response = await axios.put(LOGEMENT_PUT_URL, formData, {
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
        {auth.userId && auth.token && (
          <>
            {success ? (
              <div className={SignUpCSS.bgSection}>
                <div className={SignUpCSS.sectionSignUp}>
                  <h1> Logement modifié ! </h1>
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
                  <h1>Modifier un logement</h1>
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="text">Titre :</label>
                    <input
                      type="text"
                      id="title"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      required
                    />
                    <label htmlFor="text">Lieu :</label>
                    <input
                      type="text"
                      id="location"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => setLocation(e.target.value)}
                      value={location}
                      required
                    />
                    <label htmlFor="text">Description :</label>
                    <input
                      type="text"
                      id="description"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      required
                    />
                    <label htmlFor="text">Équipements :</label>
                    <input
                      type="text"
                      id="équipements"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) =>
                        setEquipements(e.target.value.split(','))
                      }
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
                          ? SignUpCSS.instructions
                          : SignUpCSS.offscreen
                      }
                    >
                      ⚠ Merci de séparer les differents équipements par des
                      virgules
                    </p>
                    <label htmlFor="text">Tags :</label>
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
                          ? SignUpCSS.instructions
                          : SignUpCSS.offscreen
                      }
                    >
                      ⚠ Merci de séparer les differents tags par des virgules
                    </p>
                    <label htmlFor="image">Image de présentation:</label>
                    <input
                      accept="image/png, image/jpeg, image/jpg"
                      name="image"
                      type="file"
                      id="image"
                      ref={userRef}
                      required
                    />
                    <label htmlFor="image">Photos de votre logement:</label>
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
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default UpdateFormLogement
