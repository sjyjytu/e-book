import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import HomePage from './components/Main/HomePage';
import BooksPage from './components/Book/BooksPage';
import BookDetail from "./components/Book/BookDetail";
import ShoppingCart from "./components/Shopping/ShoppingCart";
import SignUp from './components/SignUp';
import Login from './components/Login';
import AddNewBook from './components/Book/AddNewBook';

const BasicRoute = () => {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/all-books" component={BooksPage}/>
                <Route exact path="/book/:ISBN" component={BookDetail}/>
                <Route exact path="/cart/:id" component={ShoppingCart}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/add-new-book" component={AddNewBook}/>
            </Switch>
        </HashRouter>
    );
};

export default BasicRoute;