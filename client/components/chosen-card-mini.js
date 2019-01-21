import React from 'react'

import {connect} from 'react-redux'
import {MainForm} from './main-form'
import {OptionsBar} from './options-bar'

/**
 * COMPONENT
 */
export const ChosenCardMini = props => {
  return (
    <div className="chosen-box-mini">
      <div className="chosen-img">
        <img
          className="chosen-image"
          src="https://res.cloudinary.com/dmp2crnzz/image/upload/v1547869002/static/quik2.jpg"
        />
      </div>
      <div className="chosen-info">
        <p>
          {props.chosenLocation.name},{props.chosenLocation.state}
        </p>
      </div>
    </div>
  )
}
