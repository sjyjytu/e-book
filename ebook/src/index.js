import React from 'react';
import ReactDOM from 'react-dom';
import BasicRoute from './Routers';
//import {Provider} from 'react-redux';
import theme from './theme';
import {MuiThemeProvider} from "@material-ui/core/styles";
//import store from './configureStore';

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <BasicRoute/>
    </MuiThemeProvider>
    ,document.getElementById('root')
);