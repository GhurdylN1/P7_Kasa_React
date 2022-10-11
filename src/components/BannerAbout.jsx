import React from 'react'
import CssBanner from './Banner.module.css'
import bannerImg from '../assets/banabout.jpg'

function BannerAbout() {
  return (
    <section className={CssBanner.banner}>
      <div className={CssBanner.imgContainer}>
        <img
          src={bannerImg}
          alt="chaine de montagnes enneigée"
          className={CssBanner.img}
        />
      </div>
    </section>
  )
}

export default BannerAbout
