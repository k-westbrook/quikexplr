import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Test from './test'
import {MainForm} from './main-form'
import {OptionsBar} from './options-bar'
import {Checkbox} from '@material-ui/core'
import {gotConsent} from '../store/user'
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

          <form onSubmit={this.handleConsent}>
            <div>
              <label htmlFor="consent">
                <small>
                  I understand and give consent for QuikExplr to find my current
                  location.
                </small>
              </label>
              <input name="consent" type="checkbox" value="1" required />
            </div>
            <button type="submit">Submit</button>
          </form>
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
    consent: state.user.hasConsent
  }
}
const mapDispatch = dispatch => {
  return {
    gotConsent: () => dispatch(gotConsent())
  }
}

export default connect(mapState, mapDispatch)(CreateTripForm)
