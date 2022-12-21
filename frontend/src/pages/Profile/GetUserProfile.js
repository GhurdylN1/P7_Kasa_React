import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Error404 from '../Error404/Error404'
import GetUserLogements from '../../components/Logements/GetUserLogements'

import CssProfile from '../Lodgings/Lodgings.module.css'

import useUsersService from '../../services/usersService'

import defaultUserPicture from '../../assets/defaultProfilePict.png'

import AuthContext from '../../context/AuthProvider'
import { useContext } from 'react'

import { Link } from 'react-router-dom'

function UserProfile() {
  // le token et l'userId restent présent tant qu'on ne rafraichit pas la page
  const { auth } = useContext(AuthContext)

  const usersService = useUsersService()

  const urlUserId = useParams().id
  const [loading, setLoading] = useState(true)
  const [error404, setError404] = useState(false)
  const [dataUser, setDataUser] = useState({
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
        const userData = await usersService.getUserById(urlUserId)
        setLoading(false)
        setDataUser(userData)
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
    getDataUser()
  }, [urlUserId]) // array sans usersService sinon boucle infinie (warning esLint)

  if (error404 && !loading) {
    // on retourne la page Error404 si les données son incorrectes
    return <Error404 />
  }

  // on sépare le nom du prénom dans les données
  const name = dataUser.fullName.split(' ')

  // on veut afficher une image de profil par défault si l'utilisateur n'en as pas encore.
  const avatarImage =
    dataUser.profilePict !== undefined && dataUser.profilePict !== null
      ? `${dataUser.profilePict}`
      : defaultUserPicture

  // console.log(auth.userId, auth.token)

  return (
    <div className="mainContainer">
      <div className="container">
        <Header />
        {dataUser && (
          <section>
            <br></br>
            <div className={CssProfile.hostContainerProfile}>
              <div className={CssProfile.leftContainer}>
                <div className={CssProfile.title}>
                  Bonjour, je m'appelle {name[0]}&nbsp;:
                </div>
                <div className={CssProfile.hostName}>✔ Membre depuis 2022</div>
              </div>
              <div className={CssProfile.rightContainer}>
                <div className={CssProfile.hostInfos}>
                  <div className={CssProfile.hostName}>
                    {name[0]}
                    <br />
                    {name[1]}
                  </div>
                  <div className={CssProfile.pictContainer}>
                    <img
                      className={CssProfile.hostPicture}
                      src={avatarImage}
                      alt="hebergeur"
                    />
                  </div>
                </div>
              </div>
            </div>
            <br></br>
            <div>
              <div className={CssProfile.location}>
                {/* On affiche un message different si l'utilisateur n'a pas encore de présentation */}
                {dataUser.hostDescription !== undefined &&
                dataUser.hostDescription !== null ? (
                  dataUser.hostDescription
                ) : (
                  <p> {name[0]} n'a pas encore rempli sa présentation </p>
                )}
              </div>
            </div>
            <br></br>
            <div className={CssProfile.location}>
              Voici ce que {name[0]} vous propose&nbsp;:
            </div>
          </section>
        )}
        <section>
          {urlUserId === auth.userId && (
            <>
              <br />
              <Link to="/formlogement">
                <p className={CssProfile.updateLinks}>Créer un logement</p>
              </Link>
              <br />
              <Link to={`/formprofile/${auth.userId}`}>
                <p className={CssProfile.updateLinks}>Éditer votre profil</p>
              </Link>
            </>
          )}
        </section>
        <GetUserLogements />
        <br />
        <section>
          <div className={CssProfile.email}>
            Pour contacter {name[0]}&nbsp;:{' '}
            <a
              href={`mailto:${dataUser.email}`}
              className={CssProfile.updateLinks}
            >
              {' '}
              envoyer un email{' '}
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default UserProfile
