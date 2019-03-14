var superagent = require('superagent');

const RootUrl = 'http://localhost:8080/ebookmavenend';

function resBody(res) {
    return res.body;
}

const request = {
    get: (url,body)=>superagent.get(RootUrl+url).set('Content-Type','application/json').send(body).then(resBody),
    post:(url,body)=>superagent.post(RootUrl+url).set('Content-Type','application/json').send(body).then(resBody)
};

//show books, add to cart, manage books and remove a book from cart
export const Book = {
    showBooks: (num)=>request.get('/api/get/books',{"num":num}),
    addToCart: (_id, bookname, num, ISBN) => request.post("/api/post/add",{"_id":_id,"bookname":bookname, "num": num, "ISBN": ISBN}),
    removeFromCart: (_id, bookname, ISBN) => superagent.delete(RootUrl + "/api/delete/remove").set('Content-Type', 'application/json').send({
        "_id": _id,
        "bookname": bookname,
        "ISBN": ISBN
    }).then(resBody),
    showCart: (_id) => request.get("/api/get/cart/" + _id),
};

//the action of manager add a book, delete a book, update a book, ban a user
export const Manage = {
    addABook: (/*bookname, stockNum, summary, pictureUrl, author, price*/book) => request.post("/api/manage/add",
        /*{
            "bookname": bookname, "stockNum": stockNum, "summary": summary, "pictureUrl": pictureUrl, "author": author,
            "price": price
        }*/book).then(resBody),
    deleteABook: (_id, bookname, ISBN) => superagent.delete(RootUrl + "/api/manage/delete").set('Content-Type', 'application/json')
        .send({"bookname": bookname, "_id": _id, "ISBN": ISBN}).then(resBody),
    updateABook: (bookname, stockNum, summary, pictureUrl, author, price, ISBN) => superagent.put(RootUrl + "/api/manage/update")
        .set('Content-Type', 'application/json')
        .send({
            "bookname": bookname, "stockNum": stockNum, "summary": summary, "pictureUrl": pictureUrl, "author": author,
            "price": price, "ISBN": ISBN
        })
        .then(resBody),
    banAUser: _id => superagent.put(RootUrl + "/api/manage/ban").set('Content-Type', 'application/json')
        .send({"_id": _id}).then(resBody),
};

export const Order = {
    showOrder: _id => request.get("/api/get/order/" + _id),
    generateAnOrder: (_id, booksArr, totalPrice) => request.post("/api/post/order", {"_id": _id, "books": booksArr, "totalPrice": totalPrice}),
};

//
export const User = {
    login: (username, password) => request.post('/api/user/login',{"username":username, "password": password}),
    signup: (username, password, email) => request.post('/api/user/signup',{"username":username, "password": password,
        "email": email})
};