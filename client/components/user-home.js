import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, classes} = props

  return (
    <div className="home-container">
      <img
        src="https://res.cloudinary.com/dmp2crnzz/image/upload/v1547869004/static/quik.jpg"
        className="background-home"
      />
      <div className="user-box">
        <h3 className="title-home">Welcome {email}</h3>
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
