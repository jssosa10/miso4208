import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
export const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#388E3C',
        main: '#2E7D32',
        dark: '#1B5E20',
        contrastText: '#fff',
      },
      secondary: {
        light: '#d32f2f',
        main: '#c62828',
        dark: '#b71c1c',
        contrastText: '#fff',
      },
    },
    typography: {
      fontFamily: "Montserrat",
    },
  });
  
export const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    paper: {
      marginTop: theme.spacing(12),
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(2),
    },
    space: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(5),
    },
    text: {
      fontSize: "11pt",
      fontFamily: "Montserrat",
    },
    margin: {
      margin: theme.spacing(0),
    },
    logo: {
      width: 135,
      height: 43.54,
      marginRight: theme.spacing(4),
    },
    error: {
      marginBottom: theme.spacing(2)
    }
  }));