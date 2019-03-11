var superagent = require('superagent');

const RootUrl = 'http://localhost:8080/ebookmavenend';

function resBody(res) {
    return res.body;
}

const request = {
    get: url=>superagent.get(RootUrl+url).set('Content-Type','application/json').then(resBody),
    post:(url,body)=>superagent.post(RootUrl+url).set('Content-Type','application/json').send(body).then(resBody)
};

//show books, add to cart, manage books and remove a book from cart
export const Book = {
    showBooks: ()=>request.get('/api/get/books'),
    addToCart: (_id, bookname, num) => request.post("/api/post/add",{"_id":_id,"bookname":bookname, "num": num}),
    removeFromCart: (_id, bookname) => superagent.delete(RootUrl + "/api/delete/remove").set('Content-Type', 'application/json').send({
        "_id": _id,
        "bookname": bookname
    }).then(resBody),
    showCart: (_id) => request.get("/api/get/cart/" + _id),
};

//the action of manager add a book, delete a book, update a book, ban a user
export const Manage = {
    addABook: (bookname, stockNum, summary, pictureUrl, author, price) => request.post("/api/manage/add",
        {
            "bookname": bookname, "stockNum": stockNum, "summary": summary, "pictureUrl": pictureUrl, "author": author,
            "price": price
        }),
    deleteABook: (bookname) => superagent.delete(RootUrl + "/api/manage/delete").set('Content-Type', 'application/json')
        .send({"bookname": bookname}).then(resBody),
    updateABook: (bookname, stockNum, summary, pictureUrl, author, price) => superagent.put(RootUrl + "/api/manage/update")
        .set('Content-Type', 'application/json')
        .send({
            "bookname": bookname, "stockNum": stockNum, "summary": summary, "pictureUrl": pictureUrl, "author": author,
            "price": price
        })
        .then(resBody),
    banAUser: _id => superagent.put(RootUrl + "/api/manage/ban").set('Content-Type', 'application/json').send({"_id": _id}).then(resBody),
};

export const Order = {
    showOrder: _id => request.get("/api/get/order/" + _id),
    generateAnOrder: _id => request.post("/api/post/order", {"_id": _id}),
};

//
export const User = {
    login: (username, password) => request.post('/api/user/login',{"username":username, "password": password}),
    signup: (username, password, email) => request.post('/api/user/signup',{"username":username, "password": password,
        "email": email})
};