import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Test from './test'
import {MainForm} from './main-form'
import {OptionsBar} from './options-bar'
import {Checkbox} from '@material-ui/core'
import {gotConsent} from '../store/user'
import {getLocationThunk} from '../store/location'
/**
 * COMPONENT
 */
export class CreateTripForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleConsent = this.handleConsent.bind(this)
  }
  handleConsent(evt) {
    evt.preventDefault()
    const checked = evt.target.consent.value
    if (checked === '1') this.props.gotConsent()
  }

  render() {
    return (
      <div>
        <MainForm />
        <div className="user-box">
          <h4 className="title-home">Give me a destination!</h4>
          <OptionsBar />
          {!this.props.consent ? (
            <form onSubmit={this.handleConsent}>
              <div>
                <label htmlFor="consent">
                  <small>
                    I understand and give consent for QuikExplr to find my
                    current location.
                  </small>
                </label>
                <input name="consent" type="checkbox" value="1" required />
              </div>
              <button type="submit">Submit</button>
            </form>
          ) : (
            <div>
              <button type="submit" onClick={this.props.getLocation}>
                {' '}
                Let's go!
              </button>
              <p>It looks like you are in {this.props.location.city}</p>
              <p>
                Discover a new town: {this.props.chosenLocation.name},{' '}
                {this.props.chosenLocation.state}
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    consent: state.user.hasConsent,
    location: state.location.userLocation,
    chosenLocation: state.location.chosenDestination
  }
}
const mapDispatch = dispatch => {
  return {
    gotConsent: () => dispatch(gotConsent()),
    getLocation: () => dispatch(getLocationThunk())
  }
}

export default connect(mapState, mapDispatch)(CreateTripForm)
