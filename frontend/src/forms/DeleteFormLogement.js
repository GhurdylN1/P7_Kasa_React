import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import React from 'react'
import DeleteLogCSS from './Form.module.css'
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
  const userToken = auth.token

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
      setSuccess(true)
    } catch (err) {}
  }
  return (
    <div className="mainContainer">
      <div className="container">
        <Header />
        {userId && userToken && (
          <>
            {success ? (
              <div className={DeleteLogCSS.bgSection}>
                <div className={DeleteLogCSS.sectionSignUp}>
                  <h1> Logement supprimé ! </h1>
                  <p>
                    <Link
                      className={DeleteLogCSS.aReg}
                      to={`/profile/${auth.userId}`}
                    >
                      {' '}
                      Revenir au profil{' '}
                    </Link>
                  </p>
                </div>
              </div>
            ) : (
              <div className={DeleteLogCSS.bgSection}>
                <div className={DeleteLogCSS.sectionSignUp}>
                  <h2>Supprimer le logement</h2>
                  <h4> ⚠ Cette action est irréversible ⚠</h4>
                  <div>
                    <p>
                      <Link
                        className={DeleteLogCSS.aReg}
                        to={`/lodgings/${urlId}`}
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
