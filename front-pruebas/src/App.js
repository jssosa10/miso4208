import React, { useState } from 'react';
import Home from './components/home'
import {useStyles, theme} from './styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import DocumentTitle from 'react-document-title';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core/styles';

function App() {
  const classes = useStyles();
  return (
    <DocumentTitle title='Herramienta de automatización de pruebas' >
        <ThemeProvider theme={theme}>
          <div className={classes.root}>
            <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet"></link>
            <CssBaseline />
            <AppBar position="fixed" color="primary">
              <Toolbar>
                {/* <a href={"https://www.centronacionaldeconsultoria.com/"} className={classes.logo}>
                  <img className={classes.logo} src={Logo} />
                </a> */}
                <Typography variant="h1" className={classes.title} style={{ fontSize: "18pt", fontFamily: "Montserrat" }}>
                  Herramienta de automatización de pruebas
                </Typography>
              </Toolbar>
            </AppBar>
            <div className={classes.paper}>
              <Home />
            </div>
          </div>
            
          </ThemeProvider>
      </DocumentTitle >
      
  );
}

export default App;
