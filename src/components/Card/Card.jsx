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

  // trouver comment afficher un tag "Meilleur Choix" uniquement sur les cartes des logements notés 5 étoiles
  // récupération des logements notés 5 étoiles
  // const filteredTopRatings = lodgings.filter(
  //   (rateNumber) => rateNumber.rating === '5'
  // )
  // console.log(filteredTopRatings)

  // récupération des id uniquements (des logements notés 5 étoiles)
  // const topRatingsId = filteredTopRatings.map((topHostId) => topHostId.id)
  // console.log(topRatingsId)

  // récupération des logements notés moins de 5 étoiles
  // const filteredRatings = lodgings.filter(
  //   (rateNumber) => rateNumber.rating < '5'
  // )
  // console.log(filteredRatings)

  return (
    <>
      <div className={CssCard.cardBackground}>
        {lodgings.map((lodging) => (
          <Link key={lodging.id} to={`/lodgings/${lodging.id}`}>
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

//   return (
//     <>
//       <div className={CssCard.cardBackground}>
//         {filteredTopRatings.map((lodging) => (
//           <Link key={lodging.id} to={`/lodgings/${lodging.id}`}>
//             <div key={lodging.id} className={CssCard.card}>
//               <img
//                 src={lodging.cover}
//                 alt={lodging.title}
//                 className={CssCard.cover}
//               />
//               <div className={CssCard.title}>{lodging.title}</div>
//               <div className={CssCard.topHost}>✔ Meilleur Choix</div>
//             </div>
//           </Link>
//         ))}
//         {filteredRatings.map((lodging) => (
//           <Link key={lodging.id} to={`/lodgings/${lodging.id}`}>
//             <div key={lodging.id} className={CssCard.card}>
//               <img
//                 src={lodging.cover}
//                 alt={lodging.title}
//                 className={CssCard.cover}
//               />
//               <div className={CssCard.title}>{lodging.title}</div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </>
//   )
// }

export default Card
