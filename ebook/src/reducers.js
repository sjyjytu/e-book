import {combineReducers} from "redux/es/redux";

function Login(state={_id:'',username:'',isManager:0},action) {
    switch (action.type) {
        case "LOGIN":
            return action.result;
        default:
            return state;
    }
}

function Redirect(state={redirectTo:null},action) {
    switch (action.type) {
        case 'REDIRECTED':
            return {redirectTo: null};
        case 'SIGN_UP':
        case 'ADD_BOOK':
        case 'LOGIN':
            return {redirectTo: '/'};
        default:
            return state;

    }
}

function BookDetail(state={books: []},action) {
    switch (action.type) {
        case "SHOW_BOOK":
            return {books: action.result.books};
        case "ADD_BOOK":
            //action.book {"bookname":  ,"stockNum":  , "summary":  ,"pictureUrl":  ,"price":  ,"author":  }
            const newState = Object.assign({}, state);
            newState.books.push(action.book);
            return newState;
        case "DELETE_BOOK":
            //action.bookname
            const newState2 = Object.assign({}, state);
            for (var i = 0; i < newState2.books.length; i++) {
                if (newState2.books[i].bookname === action.bookname) {
                    //cart has this book
                    newState2.books.splice(i, 1);
                    return newState2;
                }
            }
            //cart doesn't have this book
            return state;
        case "UPDATE_BOOK":
            //action.book
            const newState3 = Object.assign({}, state);
            for (var i = 0; i < newState3.books.length; i++) {
                if (newState3.books[i].bookname === action.book.bookname) {
                    //book exits
                    Object.assign(newState3.books[i],action.book);
                    return newState3;
                }
            }
            //book not exit
            return state;
        default:
            return state;
    }
}

function BookAndNum(state={books: []},action) {
    switch (action.type) {
        case "SHOW_CART":
            return {books: action.result.books};
        case "ADD_TO_CART":
            //action.bookname action.num
            const newState = Object.assign({}, state);
            for (var i = 0; i < newState.books.length; i++) {
                if (newState.books[i].bookname === action.bookname) {
                    //cart has this book
                    newState.books[i].num += action.num;
                    return newState;
                }
            }
            //cart doesn't have this book
            newState.books.push({"bookname": action.bookname, "num": action.num});
            return newState;
        case "REMOVE_FROM_CART":
            const nState = Object.assign({}, state);
            //action.bookname
            for (var i = 0; i < nState.books.length; i++) {
                if (nState.books[i].bookname === action.bookname) {
                    //cart has this book
                    nState.books.splice(i, 1);
                    return nState;
                }
            }
            //cart doesn't have this book
            return state;
        default:
            return state;
    }
}

function Order(state={orders:[]},action) {
    switch (action.type) {
        case "SHOW_ORDER":
            //action.result {orders:[{"userId":.....}]}
            return {orders: action.result.orders};
        case "GENERATE_ORDER":
            //action.order {"userId":...}
            const newState = Object.assign({}, state);
            newState.orders.push(action.order);
            return newState;
        default:
            return state;
    }
}

export default combineReducers(
    {Login, Redirect, BookDetail, Order}
);