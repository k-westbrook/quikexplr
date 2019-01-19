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
    flexGrow: 1,
    fontFamily: 'Fugaz One',
    fontSize: '1.5em'
  },
  links: {
    padding: '.7em',
    fontFamily: 'Bree Serif'
  },
  nav: {
    marginEnd: '2em'
  }
})

class Navbar extends React.Component {
  render() {
    const {handleClick, isLoggedIn, classes} = this.props
    return (
      <div>
        <AppBar position="static" color="secondary" className={classes.root}>
          <Toolbar className={classes.root}>
            <Typography
              href="/home"
              variant="h4"
              color="primary"
              className={classes.root}
            >
              QuikExplr
            </Typography>
            {isLoggedIn ? (
              <div display="flex">
                <Button href="/home" color="primary" className="links">
                  Home
                </Button>
                <Button color="primary" onClick={handleClick}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="nav">
                <Button href="/login" color="primary" className="links">
                  Login
                </Button>
                <Button href="/signup" color="primary">
                  Sign Up
                </Button>
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
