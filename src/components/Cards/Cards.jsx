// import { useState } from 'react'
import CssCard from './Cards.module.css'
import Card from '../Card/Card'

function Cards({ data }) {
  return (
    <div className={CssCard.cardBackground}>
      {data.map(({ id, cover, title, rating }) => (
        <Card key={id} id={id} cover={cover} title={title} rating={rating} />
      ))}
    </div>
  )
}

export default Cards
