import React from 'react'

import {connect} from 'react-redux'
import {MainForm} from './main-form'
import {OptionsBar} from './options-bar'

/**
 * COMPONENT
 */
export const ChosenCardMini = props => {
  return (
    <div className="trip-item">
      <p>
        {props.chosenLocation.name},{props.chosenLocation.state}
      </p>
    </div>
  )
}
