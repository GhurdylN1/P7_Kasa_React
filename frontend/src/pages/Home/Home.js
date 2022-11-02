import React from 'react'
import Banner from '../../components/Banner/Banner'
import Cards from '../../components/Cards/Cards'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import lodgingsService from '../../services/lodgingsService'

const Home = () => {
  return (
    <div className="mainContainer">
      <div className="container">
        <Header />
        <Banner />
        <Cards data={lodgingsService.getAll()} />
      </div>
      <Footer />
    </div>
  )
}

export default Home
