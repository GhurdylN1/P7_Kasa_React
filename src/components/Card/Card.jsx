import { useState } from 'react'
import PropTypes from 'prop-types'
import Lodgings from '../../data/logements.json'
import CssCard from './Card.module.css'
import { Link } from 'react-router-dom'

Card.propTypes = {
  key: PropTypes.string,
  title: PropTypes.string,
  cover: PropTypes.string,
}

function Card() {
  const [lodgings] = useState(Lodgings)

  return (
    <>
      <div className={CssCard.cardBackground}>
        {lodgings.map((lodging) => (
          <Link key={lodging.id} to={`/P7_Kasa_React/lodgings/${lodging.id}`}>
            <div key={lodging.id} className={CssCard.card}>
              <img
                src={lodging.cover}
                alt={lodging.title}
                className={CssCard.cover}
              />
              <div className={CssCard.title}>{lodging.title}</div>
              {lodging.rating > 4 && (
                <div className={CssCard.topHost}>✔ Meilleur Choix</div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Card
