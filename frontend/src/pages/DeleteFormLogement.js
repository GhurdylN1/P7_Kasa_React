import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import React from 'react'
import SignUpCSS from './Sign.module.css'
import { useState } from 'react'
import axios from '../api/ApiKasaMongoDB'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import { useContext } from 'react'

import { useParams } from 'react-router-dom'

const DeleteFormLogement = () => {
  const { auth } = useContext(AuthContext)

  const urlId = useParams().id
  const LOGEMENT_DELETE_URL = `/api/logements/${urlId}`

  const userId = auth.userId
  console.log(userId)

  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.delete(LOGEMENT_DELETE_URL, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })

      console.log(response.data)
      // console.log(JSON.stringify(response))
      setSuccess(true)
    } catch (err) {}
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
                  <h1> Logement supprimé ! </h1>
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
                  <h2>Supprimer le logement</h2>
                  <h4> ⚠ Cette action est irréversible ⚠</h4>
                  <div>
                    <p>
                      <Link
                        className={SignUpCSS.aReg}
                        to={`/P7_Kasa_React/lodgings/${urlId}`}
                      >
                        {' '}
                        Revenir au logement{' '}
                      </Link>
                    </p>
                  </div>
                  <form onSubmit={handleSubmit}>
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

export default DeleteFormLogement
