import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Error404 from '../Error404/Error404'
import CssLodgings from '../Lodgings/Lodgings.module.css'
import useUsersService from '../../services/usersService'
// import usersService from '../../services/usersService'
import GetUserLogements from '../../components/GetUserLogements'
import defaultUserPicture from '../../assets/defaultProfilePict.png'
import AuthContext from '../../context/AuthProvider'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

function UserProfile() {
  // le token et l'userId restent présent tant qu'on ne rafraichit pas la page
  const { auth } = useContext(AuthContext)

  const usersService = useUsersService() // pour test interceptor axios

  const urlUserId = useParams().id
  const [loading, setLoading] = useState(true)
  const [error404, setError404] = useState(false)
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
        // const response = await api.get(`/api/users/${urlUserId}`)
        const response = await usersService.getUserById(urlUserId)
        setLoading(false)
        setdataUser(response)
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
    pushDataUser()
  }, []) // array vide sinon boucle infinie

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

  console.log(auth.userId, auth.token)

  return (
    <div className="mainContainer">
      <div className="container">
        <Header />
        {dataUser && (
          <section>
            <br></br>
            <div className={CssLodgings.hostContainerProfile}>
              <div className={CssLodgings.leftContainer}>
                <div className={CssLodgings.title}>
                  Bonjour, je m'appelle {name[0]} :
                </div>
                <div className={CssLodgings.hostName}>✔ Membre depuis 2022</div>
              </div>
              <div className={CssLodgings.rightContainer}>
                <div className={CssLodgings.hostInfos}>
                  <div className={CssLodgings.hostName}>
                    {name[0]} <br></br> {name[1]}
                  </div>
                  <div className={CssLodgings.pictContainer}>
                    <img
                      className={CssLodgings.hostPicture}
                      src={avatarImage}
                      alt="hebergeur"
                    />
                  </div>
                </div>
              </div>
            </div>
            <br></br>
            <div>
              <div className={CssLodgings.location}>
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
            <div className={CssLodgings.location}>
              Voici ce que {name[0]} vous propose :
            </div>
          </section>
        )}
        <section>
          {urlUserId === auth.userId && (
            <>
              <br />
              <Link to="/P7_Kasa_React/formlogement">
                <h3>Créer un logement</h3>
              </Link>
              {/* <br />
              <Link to={`/P7_Kasa_React/formprofile/${auth.userId}`}>
                <h3>Éditer votre profil</h3>
              </Link> */}
            </>
          )}
        </section>
        <GetUserLogements />
        <br />
        <section>
          <div className={CssLodgings.location}>
            Pour contacter {name[0]} :{' '}
            <a href={`mailto:${dataUser.email}`}> envoyer un email </a>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default UserProfile
