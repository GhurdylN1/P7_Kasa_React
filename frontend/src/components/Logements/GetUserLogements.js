import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import uselodgingsService from '../../services/lodgingsService'
import CssCard from '../../components/Card/Card.module.css'
import Card from '../Card/Card'

function GetUserLogements() {
  const urlUserId = useParams().id // recuperer l'id utilsateur pour le comparer à celui dans les logements
  const [userLogements, setUserLogements] = useState([])

  const lodgingsService = uselodgingsService()

  // je veux filtrer les logements pour pouvoir afficher uniquement ceux de l'utilisateur ayant l'id de l'url (du profil)
  useEffect(() => {
    const UserLogements = async () => {
      try {
        // const response = await api.get('/api/logements')
        const logementUser = await lodgingsService.getByUserID(urlUserId)
        setUserLogements(logementUser)
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
  }, [urlUserId]) // array sans lodgingsService sinon boucle infinie (warning esLint)

  return (
    <div className={CssCard.cardBackground}>
      {userLogements.length === 0 ? (
        <h3> Vos logements s'afficheront ici </h3>
      ) : (
        <>
          {userLogements.map(({ _id, cover, title, averageRating }) => (
            <Card
              key={_id}
              id={_id}
              cover={cover}
              title={title}
              averageRating={averageRating}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default GetUserLogements
