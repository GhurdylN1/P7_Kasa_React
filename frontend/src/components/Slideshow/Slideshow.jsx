import React from 'react'
import { useState } from 'react'
import CssSlide from './Slideshow.module.css'
import Arrow from '../../assets/arrowIcon.svg'

const Slideshow = (img) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const previousImg = () => {
    const isFirstImg = currentIndex === 0
    const newIndex = isFirstImg ? img.data.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextImg = () => {
    const isLastImg = currentIndex === img.data.length - 1
    const newIndex = isLastImg ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  return (
    <div className={CssSlide.slideContainer}>
      {img.data.length > 1 && (
        <>
          <img
            src={Arrow}
            alt="left arrow"
            role="button"
            className={CssSlide.leftArrow}
            onClick={previousImg}
          />
          <img
            src={Arrow}
            alt="right arrow"
            role="button"
            className={CssSlide.rightArrow}
            onClick={nextImg}
          />
        </>
      )}
      <div className={CssSlide.imgContainer}>
        <img
          src={img.data[currentIndex]}
          alt="logement"
          className={CssSlide.imgSlide}
        />
      </div>
      <div className={CssSlide.numbers}>
        {img.data.length > 1 && (
          <p>{currentIndex + 1 + '/' + img.data.length}</p>
        )}
      </div>
    </div>
  )
}

export default Slideshow
