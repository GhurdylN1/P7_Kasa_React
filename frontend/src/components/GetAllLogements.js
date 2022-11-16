import React from 'react'
import { useState, useEffect } from 'react'
import CssCard from '../components/Cards/Cards.module.css'
import lodgingsService from '../services/lodgingsService'
import Card from './Card/Card'

function GetAllLogements() {
  const [logements, setLogements] = useState([])

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
          console.log(`Error: ceci est une erreur`)
        }
      }
    }

    GetLogements()
  }, [])

  // test avec le composant card
  return (
    <div className={CssCard.cardBackground}>
      {logements.map(({ _id, cover, title }) => (
        <Card key={_id} id={_id} cover={cover} title={title} />
      ))}
    </div>
  )

  // premier test d'affichage des logements sans css
  //   return (
  //     <div>
  //       {logements.map(({ _id, title, description, location, cover }) => (
  //         <div key={_id}>
  //           <img src={cover} alt="appartement" width="300px"></img>
  //           <div>{title}</div>
  //           <div>{description}</div>
  //           <div>{location}</div>
  //         </div>
  //       ))}
  //     </div>
  //   )
}

export default GetAllLogements
