import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {MainForm} from './main-form'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <MainForm />
      <div className="user-box">
        <h3 className="title-home">Welcome {email}!</h3>
        <div className="options-container">
          <div>
            <p>My Trips</p>
          </div>
          <div>
            <p>My Profile</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
