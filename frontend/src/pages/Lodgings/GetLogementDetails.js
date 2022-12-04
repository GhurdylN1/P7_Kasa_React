import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Error404 from '../Error404/Error404'
import uselodgingsService from '../../services/lodgingsService'
// import lodgingsService from '../../services/lodgingsService'
import useUsersService from '../../services/usersService'
// import usersService from '../../services/usersService'
import CssLodgings from './Lodgings.module.css'
import Slideshow from '../../components/Slideshow/Slideshow'
import Collapse from '../../components/Collapse/Collapse'
import { Link } from 'react-router-dom'
import defaultPicture from '../../assets/defaultProfilePict.png'

import AuthContext from '../../context/AuthProvider'
import { useContext } from 'react'

import StarFull from '../../assets/fullstar.png'
import StarEmpty from '../../assets/emptystar.png'

import axios from '../../api/ApiKasaMongoDB'

function Lodging() {
  const urlId = useParams().id // récupération de l'id dans l'url
  const LOGEMENT_POST_URL = `/api/logements/${urlId}/rating`

  const [setErrMsg] = useState('')
  const [setSuccess] = useState(false)

  const errRef = useRef()

  const { auth } = useContext(AuthContext)
  // console.log(auth.userId, auth.token)

  const lodgingsService = uselodgingsService() // pour test interceptor axios
  const usersService = useUsersService() // pour test interceptor axios

  const [hoverIndex, setHoverIndex] = useState(0)
  const [rating, setRating] = useState(0)
  // console.log(rating)

  const [loading, setLoading] = useState(true)
  const [error404, setError404] = useState(false)
  const [dataLodging, setdataLodging] = useState({
    // state des données que l'on voudra observer et afficher
    _id: '',
    userId: '',
    title: '',
    cover: '',
    pictures: [],
    description: '',
    averageRating: '',
    location: '',
    equipements: [],
    tags: [],
    userRatings: [],
  })

  // donnéees du logement
  useEffect(() => {
    // obervation des données du state
    const pushDataLodging = async () => {
      try {
        // const response = await api.get(`/api/logements/${urlId}`)
        const response = await lodgingsService.getByLodgingId(urlId)
        setLoading(false)
        setdataLodging(response)
      } catch (err) {
        setLoading(false)
        setError404(true)
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
    pushDataLodging()
  }, []) // array vide sinon boucle infinie

  const idUser = dataLodging.userId // on récupere l'id de l'hébergeur
  const [dataUser, setdataUser] = useState({
    _id: '',
    email: '',
    fullName: '',
    profilePict: '',
    hostDescription: '',
  })

  // données de l'hébergeur
  useEffect(() => {
    const pushDataUser = async () => {
      try {
        // const response = await api.get(`/api/users/${idUser}`)
        const response = await usersService.getUserById(idUser)
        setdataUser(response)
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
    pushDataUser()
  }, [idUser]) // array sans "usersService" sinon boucle infinie

  if (error404 && !loading) {
    // on retourne la page Error404 si l'id de l'url ne se trouve pas dans les données de l'api
    return <Error404 />
  }

  // systeme de notation par étoiles, on récupère la valeur "averageRating" pour afficher la note moyenne
  const rateStar = []
  for (let s = 1; s <= 5; s++) {
    if (s <= dataLodging.averageRating) {
      rateStar[s] = true
    } else {
      rateStar[s] = false
    }
  }

  // on veut afficher une image de profil par défault si l'utilisateur n'en as pas encore.
  const avatarImage =
    dataUser.profilePict !== undefined && dataUser.profilePict !== null
      ? `${dataUser.profilePict}`
      : defaultPicture

  // fonction d'affichage des étoiles quand l'user survole ou clique dessus
  function Star({ full }) {
    return (
      <img
        className={CssLodgings.starPicture}
        src={full ? StarFull : StarEmpty}
        alt={full ? 'red star' : 'grey star'}
      ></img>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // let formData = new FormData()

    const averageRating = rating

    // formData.append('logement', [
    //   JSON.stringify({
    //     averageRating: averageRating,
    //   }),
    // ])
    // try {
    //   const response = await axios.post(LOGEMENT_POST_URL, formData, {
    //     headers: {
    //       Authorization: `Bearer ${auth.token}`,
    //     },
    //   })
    try {
      const response = await axios.post(
        LOGEMENT_POST_URL,
        { averageRating },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      )

      console.log(response.data)
      // console.log(JSON.stringify(response))
      setSuccess(true)
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Le serveur ne réponds pas')
      } else {
        setErrMsg('Notation échoué')
      }
      errRef.current.focus()
    }
  }

  return (
    <div className="mainContainer">
      <div className="container">
        <Header />
        <section>
          {auth.userId === idUser && (
            <>
              <Link to={`/P7_Kasa_React/updateformlogement/${urlId}`}>
                <h3>Modifier le logement</h3>
              </Link>
            </>
          )}
        </section>
        <br />
        {dataLodging && (
          <section>
            <Slideshow data={dataLodging.pictures} />
            <div className={CssLodgings.hostContainer}>
              <div className={CssLodgings.leftContainer}>
                {auth.userId !== undefined && auth.token !== undefined && (
                  <div className={CssLodgings.starsContainer}>
                    {rateStar.map((stars, index) => (
                      <img
                        key={stars + urlId + index}
                        className={CssLodgings.starPicture}
                        src={stars ? StarFull : StarEmpty}
                        alt={stars ? 'red star' : 'grey star'}
                      />
                    ))}
                  </div>
                )}
                <div className={CssLodgings.title}>{dataLodging.title}</div>
                <div className={CssLodgings.location}>
                  {dataLodging.location}
                </div>
                <div className={CssLodgings.tagsContainer}>
                  {dataLodging.tags.map((tag, index) => (
                    <div className={CssLodgings.tag} key={index}>
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
              <div className={CssLodgings.rightContainer}>
                <Link
                  to={`/P7_Kasa_React/profile/${dataUser._id}`}
                  className={CssLodgings.hostInfos}
                >
                  <div className={CssLodgings.hostName}>
                    {dataUser.fullName}
                  </div>
                  <div className={CssLodgings.pictContainer}>
                    <img
                      className={CssLodgings.hostPicture}
                      src={avatarImage}
                      alt="hebergeur"
                    />
                  </div>
                </Link>
                {auth.userId !== undefined && auth.token !== undefined ? (
                  <>
                    <div className={CssLodgings.starsContainer}>
                      <ul className={CssLodgings.starList}>
                        {[1, 2, 3, 4, 5].map((index) => {
                          return (
                            <li
                              className={CssLodgings.starListItem}
                              onMouseEnter={() => setHoverIndex(index)}
                              onMouseLeave={() => setHoverIndex(0)}
                              onClick={() => setRating(index)}
                            >
                              <Star
                                full={index <= hoverIndex || index <= rating}
                              />
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <button className={CssLodgings.starBtn}>
                        Valider la note
                      </button>
                    </form>
                  </>
                ) : (
                  <div className={CssLodgings.starsContainer}>
                    {rateStar.map((stars, index) => (
                      <img
                        key={stars + urlId + index}
                        className={CssLodgings.starPicture}
                        src={stars ? StarFull : StarEmpty}
                        alt={stars ? 'red star' : 'grey star'}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className={CssLodgings.collapseHostContainer}>
              <Collapse title="Description" text={dataLodging.description} />
              <Collapse
                title="Équipements"
                text={dataLodging.equipements.map((equipement, index) => (
                  <div key={index}>{equipement}</div>
                ))}
              />
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Lodging
