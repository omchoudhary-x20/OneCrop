import React from 'react'
import './TitleCard.css'

const TitleCard = ({title,description,imageSrc}) => {

  return (
    <div className='mainCard'>
        <div className='detailsSection'>
            <div className='cardTitle'>
                {title}
            </div>
            <div className='cardDescription'>
                {description}
            </div>
        </div>
        <img src= {imageSrc} alt='ant' height= "80vh" width= "auto" />
    </div>
  )
}

export default TitleCard
