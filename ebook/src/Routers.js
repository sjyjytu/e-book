import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import HomePage from './components/Main/HomePage';
import BooksPage from './components/Book/BooksPage';

const BasicRoute = () => {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/all-books" component={BooksPage}/>
            </Switch>
        </HashRouter>
    );
};

export default BasicRoute;