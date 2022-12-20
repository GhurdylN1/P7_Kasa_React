import React from 'react'
import { useState, useEffect } from 'react'
import CssCard from '../../components/Card/Card.module.css'
import uselodgingsService from '../../services/lodgingsService'
import Card from '../Card/Card'

function GetAllLogements() {
  const [logements, setLogements] = useState([])

  const lodgingsService = uselodgingsService()

  useEffect(() => {
    const GetLogements = async () => {
      try {
        const allLogements = await lodgingsService.getAll()
        setLogements(allLogements)
      } catch (err) {
        if (err.response) {
          // not in the 200 response range
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        } else {
          console.log(JSON.stringify(err))
        }
      }
    }

    GetLogements()
  }, []) // array vide sinon boucle infinie (warning esLint)

  return (
    <div className={CssCard.cardBackground}>
      {logements.map(({ _id, cover, title, averageRating }) => (
        <Card
          key={_id}
          id={_id}
          cover={cover}
          title={title}
          averageRating={averageRating}
        />
      ))}
    </div>
  )
}

export default GetAllLogements
