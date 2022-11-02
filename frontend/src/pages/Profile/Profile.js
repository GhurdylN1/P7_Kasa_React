import React from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Error404 from '../Error404/Error404'
import Cards from '../../components/Cards/Cards'
import lodgingsService from '../../services/lodgingsService'
import CssLodgings from '../Lodgings/Lodgings.module.css'

const Profile = () => {
  const urlName = useParams().name
  const lodging = lodgingsService.getByUserName(urlName)[0]

  if (lodging === undefined) {
    // on retourne la page Error404 si les données son incorrectes
    return <Error404 />
  }

  const name = lodging.host.name.split(' ') // on sépare le nom du prénom dans les données

  return (
    <div className="mainContainer">
      <div className="container">
        <Header />
        {lodging && (
          <section>
            <br></br>
            <br></br>
            <div className={CssLodgings.hostContainer}>
              <div className={CssLodgings.leftContainer}>
                <div className={CssLodgings.title}>
                  Bonjour, je m'appelle {name[0]} :
                </div>
                <div className={CssLodgings.hostName}>
                  ✔ Membre depuis Juin 2022
                </div>
                <br></br>
                <div className={CssLodgings.location}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </div>
              </div>
              <div className={CssLodgings.rightContainer}>
                <div className={CssLodgings.hostInfos}>
                  <div className={CssLodgings.hostName}>
                    {name[0]} <br></br> {name[1]}
                  </div>
                  <div className={CssLodgings.pictContainer}>
                    <img
                      className={CssLodgings.hostPicture}
                      src={lodging.host.picture}
                      alt="hebergeur"
                    />
                  </div>
                </div>
              </div>
            </div>
            <br></br>
            <br></br>
            <div className={CssLodgings.location}>
              Voici ce que {name[0]} vous propose :
            </div>
          </section>
        )}
        <Cards data={lodgingsService.getByUserName(urlName)} />
      </div>
      <Footer />
    </div>
  )
}

export default Profile
