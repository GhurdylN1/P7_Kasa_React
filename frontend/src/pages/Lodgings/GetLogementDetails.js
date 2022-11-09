import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Error404 from '../Error404/Error404'
import api from '../../api/logementApiTest'
import CssLodgings from './Lodgings.module.css'
import Slideshow from '../../components/Slideshow/Slideshow'
import Collapse from '../../components/Collapse/Collapse'
import { Link } from 'react-router-dom'

function Lodging() {
  const urlId = useParams().id // récupération de l'id dans l'url
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
        const response = await api.get(`/api/logements/${urlId}`)
        setdataLodging(response.data)
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
    pushDataLodging()
  }, [urlId])

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
        const response = await api.get(`/api/users/${idUser}`)
        setdataUser(response.data)
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
  }, [idUser])

  if (dataLodging._id !== urlId) {
    // on retourne la page Error404 si l'id de l'url ne se trouve pas dans les données de l'api
    return <Error404 />
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
                <div className={CssLodgings.location}>
                  {dataLodging.location}
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
                      src={dataUser.profilePict}
                      alt="hebergeur"
                    />
                  </div>
                </Link>
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
