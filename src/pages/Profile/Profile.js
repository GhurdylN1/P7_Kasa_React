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
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <div className="container" style={{ flexGrow: 1 }}>
        <Header />
        {lodging && (
          <section>
            <br></br>
            <br></br>
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
          </section>
        )}
        <Cards data={lodgingsService.getByUserName(urlName)} />
      </div>
      <Footer />
    </div>
  )
}

export default Profile
