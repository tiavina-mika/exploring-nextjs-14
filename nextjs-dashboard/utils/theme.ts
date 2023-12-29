import { secondaryFontStyle } from './../app/ui/fonts';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#000',
    },
    background: {
      paper: '#101012',
      default: '#0e0e0e',
    },
  },
  typography: {
    // font should be defined in <body>
    fontFamily: 'inherit',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // this override the default primary font (defined in <body>)
          ...secondaryFontStyle
        }
      }
    }
  }
});