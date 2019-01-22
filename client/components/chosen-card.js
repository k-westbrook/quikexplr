import React from 'react'

import {connect} from 'react-redux'
import {MainForm} from './main-form'
import {OptionsBar} from './options-bar'

/**
 * COMPONENT
 */
export const ChosenCard = props => {
  let photoNum = Math.floor(Math.random() * 6) + 1
  const url = `https://res.cloudinary.com/dmp2crnzz/image/upload/v1548108909/town_profile/${photoNum}.jpg`
  return (
    <div className="chosen-box">
      <div className="chosen-img">
        <img className="chosen-image" src={url} />
      </div>
      <div className="chosen-info">
        {props.chosenLocation.sameCity ? (
          <p className="specific-info">
            Staycation Alert! <br />
            {props.chosenLocation.name},{props.chosenLocation.state}
          </p>
        ) : (
          <p className="specific-info">
            {props.chosenLocation.name},{props.chosenLocation.state}
          </p>
        )}
      </div>
    </div>
  )
}
