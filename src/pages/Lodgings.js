import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Error404 from './Error404'
import jsonData from '../data/logements.json'
// import CssLodgings from './Lodgings.module.css'
import Slideshow from '../components/Slideshow'

const Lodging = () => {
  const data = jsonData // importation des données du fichier logements.json
  const urlId = useParams().id // récupération de l'id dans l'url
  const [dataLodging, setdataLodging] = useState({
    // state des données que l'on voudra manipuler
    id: '',
    title: '',
    cover: '',
    pictures: [],
    description: '',
    host: { name: '', picture: '' },
    rating: '',
    equipments: [],
    location: '',
    tags: [],
  })

  useEffect(() => {
    // manipulation des données du state
    const pushDataLodging = async () => {
      let found = data.find((host) => host.id === urlId) // comparaison de l'id des données avec celui de l'url
      await setdataLodging(found) // afin de récuperer les données associées à l'id
    }
    pushDataLodging()
  })

  if (dataLodging === undefined) {
    // on retourne la page Error404 si les données son incorrectes
    return <Error404 />
  }

  const name = dataLodging.host.name.split(' ') // on sépare le nom du prénom dans les données

  return (
    <div>
      <Header />
      {dataLodging && (
        <section>
          <div>
            {/* <div>
              <img
                src={dataLodging.cover}
                alt="logement"
                height={300}
                width={375}
              />
            </div> */}
            <Slideshow data={dataLodging.pictures} />
            {/* <div className={CssLodgings.diaporama}>
              {dataLodging.pictures.map((pictures, index) => {
                return (
                  <div key={index}>
                    <img
                      className={CssLodgings.imgLodging}
                      src={pictures}
                      alt="logement"
                    />
                  </div>
                )
              })}
            </div> */}
            <div>
              <h2>{dataLodging.title}</h2>
              <p>{dataLodging.location}</p>
            </div>
            <div>
              <ul>
                {dataLodging.tags.map((tags, index) => {
                  return <li key={index}>{tags}</li>
                })}
              </ul>
            </div>
            <div>
              <div>
                <p>
                  {name[0]} {name[1]}{' '}
                  {/* le prénom à un index de 0 et le nom de 1, grace à la séparation déclarée précedement*/}
                </p>
                <div>
                  <img src={dataLodging.host.picture} alt="hebergeur" />
                </div>
              </div>
            </div>
            <div>
              <h1> Noté {dataLodging.rating} étoiles sur 5 </h1>
            </div>
            <div>
              <h3>{dataLodging.description}</h3>
              <ul>
                {dataLodging.equipments.map((equipement, index) => {
                  return <li key={index}>{equipement}</li>
                })}
              </ul>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  )
}

export default Lodging
