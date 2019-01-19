import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles'
import {Typography} from '@material-ui/core'

const styles = theme => ({
  root: {
    flexGrow: 1,
    position: 'relative'
  },
  paper: {
    marginLeft: '25vh',
    marginRight: '25vh',
    marginTop: '10vh'
  },
  backgroundImg: {
    width: '100%',
    height: '100%'
  }
})
/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, classes} = props

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <img
          src="https://res.cloudinary.com/dmp2crnzz/image/upload/v1547869002/static/quik2.jpg"
          alt="Snow"
        />
        <Grid item xs={16}>
          <Paper className={classes.paper}>
            <Typography variant="h3"> Welcome {email}!</Typography>
          </Paper>
        </Grid>
      </Grid>
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

export default withStyles(styles)(connect(mapState)(UserHome))

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
