import React from 'react'
import Test from './test'
import {Navbar} from './components'
import Routes from './routes'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
    // fontFamily: `'Fugaz One',Bree Serif`
  },
  palette: {
    primary: {
      main: '#FFFFFF'
    },
    secondary: {
      main: '#228B22',
      contrastText: '#FAE8EB'
    },
    font: {
      main: '#484848'
    }
  }
})

const App = () => {
  return (
    <div>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        {/* <Test /> */}
        <Navbar />
        <Routes />
      </MuiThemeProvider>
    </div>
  )
}

export default App
