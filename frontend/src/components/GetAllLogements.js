import React from 'react'
import { useState, useEffect } from 'react'
import CssCard from '../components/Cards/Cards.module.css'
import uselodgingsService from '../services/lodgingsService'
// import lodgingsService from '../services/lodgingsService'
import Card from './Card/Card'

function GetAllLogements() {
  const [logements, setLogements] = useState([])

  const lodgingsService = uselodgingsService() // pour test interceptor axios

  useEffect(() => {
    const GetLogements = async () => {
      try {
        const response = await lodgingsService.getAll()
        setLogements(response)
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
  }, []) // array vide sinon boucle infinie

  return (
    <div className={CssCard.cardBackground}>
      {logements.map(({ _id, cover, title }) => (
        <Card key={_id} id={_id} cover={cover} title={title} />
      ))}
    </div>
  )
}

export default GetAllLogements
