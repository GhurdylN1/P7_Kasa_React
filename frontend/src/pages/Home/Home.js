import React from 'react'
import Banner from '../../components/Banner/Banner'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import GetAllLogements from '../../components/Logements/GetAllLogements'

const Home = () => {
  return (
    <div className="mainContainer">
      <div className="container">
        <Header />
        <Banner />
        <GetAllLogements />
      </div>
      <Footer />
    </div>
  )
}

export default Home
