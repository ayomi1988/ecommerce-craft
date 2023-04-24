import {createTheme, ThemeOptions} from '@mui/material';


export const customTheme: ThemeOptions = createTheme({
    palette: {
        mode: 'light',
        primary: {
            light:'#000000',
            main: '#000000',
            dark: '#333333'
        },
        background: {
            paper: '#ffffff',
            default: '#ffffff'
        },
    },
});