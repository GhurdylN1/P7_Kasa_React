import CssCard from '../Card/Card.module.css'
import { Link } from 'react-router-dom'

import React from 'react'

function Card({ id, cover, title, rating }) {
  return (
    <Link
      key={id}
      to={`/P7_Kasa_React/lodgings/${id}`}
      style={{ display: 'contents' }}
    >
      <div key={id} className={CssCard.card}>
        <img src={cover} alt={title} className={CssCard.cover} />
        <div className={CssCard.title}>{title}</div>
        {rating > 3 && ( // affichage du tag "meilleur choix" uniquement sur les logements notés 4 et 5 étoiles
          <div className={CssCard.topHost}>✔ Meilleur Choix</div>
        )}
      </div>
    </Link>
  )
}

export default Card
