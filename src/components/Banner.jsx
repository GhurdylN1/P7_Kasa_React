import React from 'react'
import CssBanner from './Banner.module.css'
import bannerImg from '../assets/banhome.jpg'

function Banner() {
  return (
    <section className={CssBanner.banner}>
      <div className={CssBanner.imgContainer}>
        <img
          src={bannerImg}
          alt="cote rocheuse bord de mer"
          className={CssBanner.img}
        />
        <h1 className={CssBanner.title}>Chez vous, partout et ailleurs</h1>
      </div>
    </section>
  )
}

export default Banner
