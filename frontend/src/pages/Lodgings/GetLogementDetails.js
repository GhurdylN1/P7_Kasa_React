import React from 'react'
import { useEffect, useState } from 'react'
// import { useRef } from 'react'

import { useParams } from 'react-router-dom'

import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Error404 from '../Error404/Error404'

import axios from '../../api/ApiKasaMongoDB'
import uselodgingsService from '../../services/lodgingsService'
import useUsersService from '../../services/usersService'

import CssLodgings from './Lodgings.module.css'

import Slideshow from '../../components/Slideshow/Slideshow'
import Collapse from '../../components/Collapse/Collapse'

import { Link } from 'react-router-dom'

import defaultPicture from '../../assets/defaultProfilePict.png'

import AuthContext from '../../context/AuthProvider'
import { useContext } from 'react'

import StarFull from '../../assets/fullstar.png'
import StarEmpty from '../../assets/emptystar.png'

function Lodging() {
  const urlId = useParams().id // récupération de l'id dans l'url
  const LOGEMENT_POST_URL = `/api/logements/${urlId}/rating`

  // const [setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  // const errRef = useRef()

  const { auth } = useContext(AuthContext)
  // console.log(auth.userId, auth.token)

  const lodgingsService = uselodgingsService()
  const usersService = useUsersService()

  const [hoverIndex, setHoverIndex] = useState(0)
  const [rating, setRating] = useState(0)

  const [review, setReview] = useState('')

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
    usersRatings: [],
  })

  // fonction pour récuperer les données du logement
  const getDataLodging = async () => {
    try {
      // const response = await api.get(`/api/logements/${urlId}`)
      const logement = await lodgingsService.getByLodgingId(urlId)
      for (let userRatingIndex in logement.usersRatings) {
        console.log(userRatingIndex)
        console.log(logement.usersRatings)
        let user = await usersService.getUserById(
          logement.usersRatings[userRatingIndex].userId
        )
        logement.usersRatings[userRatingIndex].fullName = user.fullName
        logement.usersRatings[userRatingIndex].profilePict = user.profilePict
        console.log('---------')
        console.log(user.profilePict)
        console.log(logement)
      }
      setLoading(false)
      setdataLodging(logement)
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

  // donnéees du logement au chargement de la page
  useEffect(() => {
    getDataLodging()
  }, []) // array vide sinon boucle infinie (warning esLint)

  // on récupere l'id de l'hébergeur
  const idUser = dataLodging.userId

  const [dataUser, setdataUser] = useState({
    _id: '',
    email: '',
    fullName: '',
    profilePict: '',
    hostDescription: '',
  })

  // fonction pour récuperer les données de l'hébergeur
  const getDataUser = async () => {
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

  // données de l'hébergeur au chargement de la page
  useEffect(() => {
    getDataUser()
  }, [idUser]) // array sans "getDataUser" sinon boucle infinie (warning esLint)

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

  // vote de l'utilisateur puis on veut mettre a jour la note moyenne une fois le vote effectué
  const handleSubmit = async (e) => {
    e.preventDefault()
    const userId = auth.userId
    try {
      const response = await axios
        .post(
          LOGEMENT_POST_URL,
          {
            usersRatings: {
              userId: userId,
              userRating: rating,
              userReview: review,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        )
        .then(() => getDataLodging(), setSuccess(true))

      console.log(response.data)
    } catch (err) {
      // envoie une erreur "setErrMsg n'est pas une fonction"
      // if (!err?.response) {
      //   setErrMsg('Le serveur ne réponds pas')
      // } else {
      //   setErrMsg('Notation échoué')
      // }
      // errRef.current.focus()
    }
  }

  return (
    <div className="mainContainer">
      <div className="container">
        <Header />
        {dataLodging && (
          <section>
            <Slideshow data={dataLodging.pictures} />
            <div className={CssLodgings.hostContainer}>
              <div className={CssLodgings.leftContainer}>
                <div className={CssLodgings.title}>{dataLodging.title}</div>
                <section>
                  {auth.userId === idUser && (
                    <div className={CssLodgings.updateLogement}>
                      <Link to={`/P7_Kasa_React/updateformlogement/${urlId}`}>
                        <p className={CssLodgings.updateLinks}>
                          Modifier le logement
                        </p>
                      </Link>
                      <br />
                      <Link to={`/P7_Kasa_React/deleteformlogement/${urlId}`}>
                        <p className={CssLodgings.updateLinks}>
                          Supprimer le logement
                        </p>
                      </Link>
                    </div>
                  )}
                </section>
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
            <br />
            {auth.userId !== undefined && auth.token !== undefined && (
              <>
                {success ? (
                  <div className={CssLodgings.location}>
                    Merci d'avoir donné votre avis.
                  </div>
                ) : (
                  <>
                    <div className={CssLodgings.location}>
                      Notez ce logement :
                    </div>
                    <div className={CssLodgings.starsContainer}>
                      <ul className={CssLodgings.starList}>
                        {[1, 2, 3, 4, 5].map((index) => {
                          return (
                            <li
                              key={index}
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
                      <label htmlFor="text" className={CssLodgings.location}>
                        {' '}
                        Laissez votre avis :
                      </label>
                      <textarea
                        placeholder="Merci de rester courtois dans vos propos."
                        type="text"
                        name="userReview"
                        id="userReview"
                        autoComplete="off"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                      />
                      <button className={CssLodgings.starBtn}>Valider</button>
                    </form>
                  </>
                )}
              </>
            )}
            <br />
            <div>
              <div className={CssLodgings.title}>Avis clients :</div>
              <br />
              {dataLodging.usersRatings.map((review, index) => (
                <div key={index}>
                  {[...Array(review.userRating)].map((star, index) => {
                    return (
                      <img
                        key={index}
                        className={CssLodgings.starPicture}
                        src={StarFull}
                        alt="red star"
                      ></img>
                    )
                  })}
                  <div className={CssLodgings.userReviewContainer}>
                    <Link
                      to={`/P7_Kasa_React/profile/${review.userId}`}
                      className={CssLodgings.reviewUserLink}
                    >
                      <div className={CssLodgings.pictReviewContainer}>
                        <img
                          className={CssLodgings.reviewHostPicture}
                          src={review.profilePict}
                          alt="user"
                        />
                      </div>
                      <div className={CssLodgings.location}>
                        {review.fullName}
                      </div>
                    </Link>
                  </div>
                  <div className={CssLodgings.location}>
                    {review.userReview}
                  </div>
                  <br />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Lodging
