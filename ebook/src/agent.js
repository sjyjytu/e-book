var superagent = require('superagent');

const RootUrl = 'http://localhost:8080/ebookmavenend';

function resBody(res) {
    return res.body;
}

const request = {
    get: (url)=>superagent.get(RootUrl+url).set('Content-Type','application/json').then(resBody),
    post:(url,body)=>superagent.post(RootUrl+url).set('Content-Type','application/json').send(body).then(resBody)
};

//show books, add to cart, manage books and remove a book from cart
export const Book = {
    showBooks: (start,num)=>request.post('/api/get/books',{"num":num,"start":start}),
    addToCart: (_id, bookname, num, ISBN) => request.post("/api/post/add",{"_id":parseInt(_id),"bookname":bookname, "num": num, "ISBN": ISBN}),
    removeFromCart: (_id, bookname, ISBN) => superagent.delete(RootUrl + "/api/delete/remove").set('Content-Type', 'application/json').send({
        "_id": _id,
        "bookname": bookname,
        "ISBN": ISBN
    }).then(resBody),
    showCart: (_id) => request.post("/api/get/cart",{"_id": _id}),
    getBookByISBN: (ISBN) => request.post('/api/get/book',{"ISBN": ISBN}),
    getBookByName: (bookname) => request.post("/api/get/book",{"bookname": bookname}),
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
    updateABook: (/*bookname, stockNum, summary, pictureUrl, author, price, ISBN*/book) => superagent.put(RootUrl + "/api/manage/update")
        .set('Content-Type', 'application/json')
        .send(/*{
            "bookname": bookname, "stockNum": stockNum, "summary": summary, "pictureUrl": pictureUrl, "author": author,
            "price": price, "ISBN": ISBN
        }*/book)
        .then(resBody),
    banAUser: _id => superagent.put(RootUrl + "/api/manage/ban").set('Content-Type', 'application/json')
        .send({"_id": _id.toString()}).then(resBody),
    showUsers: () => request.get("/api/get/users")
};

export const Order = {
    showOrder: _id => request.get("/api/get/order/" + _id),
    generateAnOrder: (_id, booksArr, mode) => request.post("/api/post/order", {"_id": _id, "books": booksArr, "mode": mode}),
};

//
export const User = {
    login: (username, password) => request.post('/api/user/login',{"username":username, "password": password}),
    signup: (username, password, email) => request.post('/api/user/signup',{"username":username, "password": password,
        "email": email})
};