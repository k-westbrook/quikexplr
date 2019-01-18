import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/ToolBar'
import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'

const styles = () => ({
  root: {
    flexGrow: 1
  },
  rooLink: {
    flexGrow: 1
  },
  links: {
    padding: '.7em',
    fontFamily: 'Bree Serif',
    fontSize: '1.5rem'
  }
})

class Navbar extends React.Component {
  render() {
    const {handleClick, isLoggedIn, classes} = this.props
    return (
      <div>
        <AppBar position="static" color="secondary">
          <Toolbar className={classes.root}>
            <Typography variant="h4" color="primary" className={classes.root}>
              QuikExplr
            </Typography>
            {isLoggedIn ? (
              <div>
                <Link
                  to="/home"
                  color="primary"
                  className={classes.links}
                  variant="inherit"
                >
                  My Home
                </Link>
                <Link
                  to="/login"
                  color="primary"
                  className={classes.links}
                  onClick={handleClick}
                  variant="inherit"
                >
                  Logout
                </Link>
              </div>
            ) : (
              <div>
                <Link
                  to="/login"
                  color="primary"
                  className={classes.links}
                  variant="inherit"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  color="primary"
                  className={classes.links}
                  variant="inherit"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}

{
  /* <div>
    <h1>BOILERMAKER</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */
}
{
  /* <Link to="/home">Home</Link>
  <a href="#" onClick={handleClick}>
    Logout
          </a>
  </div >
) : (
  <div>
    {/* The navbar will show these links before you log in */
}
//   <Link to="/login">Login</Link>
//   <Link to="/signup">Sign Up</Link>
// </div> * /} */}
