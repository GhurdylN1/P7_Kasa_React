import React from 'react'
import Banner from '../../components/Banner/Banner'
import Cards from '../../components/Cards/Cards'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import lodgingsService from '../../services/lodgingsService'

const Home = () => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <div className="container" style={{ flexGrow: 1 }}>
        <Header />
        <Banner />
        <Cards data={lodgingsService.getAll()} />
      </div>
      <Footer />
    </div>
  )
}

export default Home
