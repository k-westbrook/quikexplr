import React from 'react'
import {getLocationThunk} from './store/location'
import {connect} from 'react-redux'

class Test extends React.Component {
  constructor() {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit() {
    this.props.getLocationThunk()
  }
  render() {
    return (
      <div>
        <h1>Test</h1>
        <button type="submit" onClick={this.onSubmit}>
          Test Button
        </button>
        <h2>
          Your location: {this.props.location.city} {this.props.location.state}{' '}
        </h2>
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    location: state.location
  }
}

const mapDispatch = dispatch => {
  return {
    getLocationThunk() {
      dispatch(getLocationThunk())
    }
  }
}

export default connect(mapState, mapDispatch)(Test)
