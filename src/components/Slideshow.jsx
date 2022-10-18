import React from 'react'
import { useState } from 'react'
import CssSlide from './Slideshow.module.css'
import Arrow from '../assets/arrowIcon.svg'

const Slideshow = (data) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const previousImg = () => {
    const isFirstImg = currentIndex === 0
    const newIndex = isFirstImg ? data.data.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextImg = () => {
    const isLastImg = currentIndex === data.data.length - 1
    const newIndex = isLastImg ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  return (
    <div className={CssSlide.slideContainer}>
      {data.data.length > 1 && (
        <>
          <img
            src={Arrow}
            alt="left arrow"
            className={CssSlide.leftArrow}
            onClick={previousImg}
          />
          <img
            src={Arrow}
            alt="right arrow"
            className={CssSlide.rightArrow}
            onClick={nextImg}
          />
        </>
      )}
      <div className={CssSlide.imgContainer}>
        <img
          src={data.data[currentIndex]}
          alt="logement"
          className={CssSlide.imgSlide}
        />
      </div>
      <div className={CssSlide.numbers}>
        <p>{currentIndex + 1 + '/' + data.data.length}</p>
      </div>
    </div>
  )
}

export default Slideshow
