import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Error404 from '../Error404/Error404'
import CssLodgings from '../Lodgings/Lodgings.module.css'
import usersService from '../../services/usersService'
import GetUserLogements from '../../components/GetUserLogements'

function UserProfile() {
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
  }, [urlUserId])

  if (error404 && !loading) {
    // on retourne la page Error404 si les données son incorrectes
    return <Error404 />
  }

  const name = dataUser.fullName.split(' ') // on sépare le nom du prénom dans les données

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
                      src={dataUser.profilePict}
                      alt="hebergeur"
                    />
                  </div>
                </div>
              </div>
            </div>
            <br></br>
            <div>
              <div className={CssLodgings.location}>
                {dataUser.hostDescription}
              </div>
            </div>
            <br></br>
            <div className={CssLodgings.location}>
              Voici ce que {name[0]} vous propose :
            </div>
            <br />
            <div className={CssLodgings.location}>
              Pour contacter {name[0]} :{' '}
              <a href={`mailto:${dataUser.email}`}> envoyer un email </a>
            </div>
          </section>
        )}
        <GetUserLogements />
      </div>
      <Footer />
    </div>
  )
}

export default UserProfile
