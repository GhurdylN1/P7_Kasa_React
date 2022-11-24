import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import api from '../api/logementApiTest'
import uselodgingsService from '../services/lodgingsService'
// import lodgingsService from '../services/lodgingsService'
import CssCard from '../components/Cards/Cards.module.css'
import Card from './Card/Card'

function GetUserLogements() {
  const urlUserId = useParams().id // recuperer l'id utilsateur pour le comparer à celui dans les logements
  const [userLogements, setUserLogements] = useState([])

  const lodgingsService = uselodgingsService() // pour test interceptor axios

  // je veux filtrer les logements pour pouvoir afficher uniquement ceux de l'utilisateur ayant l'id de l'url (du profil)
  useEffect(() => {
    const UserLogements = async () => {
      try {
        // const response = await api.get('/api/logements')
        const response = await lodgingsService.getByUserID(urlUserId)
        setUserLogements(response)
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

    UserLogements()
  }, []) // array vide sinon boucle infinie

  // console.log(userLogements)
  // const filteredLogement = userLogements.filter(
  //   (element) => element.userId === urlUserId
  // )
  // console.log(filteredLogement)

  return (
    <div className={CssCard.cardBackground}>
      {userLogements.length === 0 ? (
        <h3> Vos logements s'afficheront ici </h3>
      ) : (
        <>
          {userLogements.map(({ _id, cover, title }) => (
            <Card key={_id} id={_id} cover={cover} title={title} />
          ))}
        </>
      )}
    </div>
  )
}

export default GetUserLogements
