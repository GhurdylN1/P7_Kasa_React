import React from 'react'
import CssBanner from './Banner.module.css'
import { useLocation } from 'react-router-dom'
import homeBannerImg from '../../assets/banhome.jpg'
import aboutBannerImg from '../../assets/banabout.jpg'

function Banner() {
  const path = useLocation().pathname // on utilise ce hook pour savoir ou l'on se trouve, sur quelle page, afin de pouvoir afficher la bannière appropriée
  const location = path.split('/')[1]

  return (
    // on utilise ici une condition ternaire avec :
    <div>
      {location === 'about' ? ( // on demande si l'on se trouve sur la page a propos alors on affiche ceci
        <section className={CssBanner.banner}>
          <div className={CssBanner.imgContainer}>
            <img
              src={aboutBannerImg}
              alt="chaine de montagnes enneigée"
              className={CssBanner.img}
            />
          </div>
        </section>
      ) : (
        // si on ne se trouve pas sur la page a propos alors on affiche cela
        <section className={CssBanner.banner}>
          <div className={CssBanner.imgContainerHome}>
            <img
              src={homeBannerImg}
              alt="cote rocheuse bord de mer"
              className={CssBanner.img}
            />
            <h1 className={CssBanner.title}>Chez vous, partout et ailleurs</h1>
          </div>
        </section>
      )}
    </div>
  )
}

export default Banner
