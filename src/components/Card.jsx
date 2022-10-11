import { useState } from 'react'
import PropTypes from 'prop-types'
import Lodgings from '../data/logements.json'
import CssCard from './Card.module.css'

Card.propTypes = {
  key: PropTypes.string,
  title: PropTypes.string,
  cover: PropTypes.string,
}

function Card() {
  const [lodgings] = useState(Lodgings)

  return (
    <div className={CssCard.cardBackground}>
      {lodgings.map((lodging) => (
        <div key={lodging.id} className={CssCard.card}>
          <img
            src={lodging.cover}
            alt={lodging.title}
            className={CssCard.cover}
          />
          <div className={CssCard.title}>{lodging.title}</div>
        </div>
      ))}
    </div>
  )
}

export default Card
