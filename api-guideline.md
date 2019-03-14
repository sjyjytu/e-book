# e-book API

### sign up

POST /api/user/signup

```json
{
	"username":"hello",
	"password":"123",
	"email": "bbb"
}
```

```json
{
    "ok": "sign up successfully"
}
```



### sign in

POST /api/user/login

```json
{
	"username":"hello",
	"password":"123"
}
```

```json
{
    "_id": "8",
    "isManager": false,
    "username": "hello"
}
```



### show books

GET /api/get/books

~~~json
{
    "books": [
        {
            "bookname": "ç®\u0080ç\u0088±",
            "stockNum": 0,
            "summary": "å\u0093\u0088å\u0093\u0088å\u0093\u0088å\u0093\u0088å\u0093\u0088å¸\u0088æ¯\u008dä¸\u0080å\u0097²",
            "pictureUrl": "https://res.cloudinary.com/dbqbt0cli/image/upload/v1552393152/yn6g38gzrdaqticwwwxx.jpg",
            "author": "null",
            "price": 0,
            "ISBN": 1
        },
        {
            "bookname": "Hate",
            "stockNum": 14,
            "summary": "i love u, i hate u. what do u think is love?",
            "pictureUrl": "https://res.cloudinary.com/dbqbt0cli/image/upload/v1552402553/udfwzzntf8f7tvbbiopc.jpg",
            "author": "xfc",
            "price": 520.13,
            "ISBN": 2
        },
        ...
    ]
}
~~~



### add a book

POST /api/manage/add

~~~json
{
    "bookname":"qwe",
    "summary":"hahaha",
    "author":"kty",
    "pictureUrl":"ddd.com",
    "stockNum":123,
    "price":888.2
}
~~~

~~~json
{
    "ok": "sign up successfully"
}
~~~



### add to cart

POST /api/post/add

~~~json
{
	"_id": "22",
	"bookname" : "Hate",
	"num": 3,
    "ISBN": 1
}
~~~

~~~json
{ok : 'add to cart successfully'}
~~~



### show cart

GET /api/get/cart

```json
{
	"_id": "1"
}
```

```json
{
    "books": [
        {
            "num": 3,
            "bookname": "HelloWorld",
            "ISBN": 1
        },
        {
            "num": 4,
            "bookname": "Hate",
            "ISBN": 2
        }
    ]
}
```



### generate an order

POST /api/post/order

干！order和user是数据库的关键字，不能作为表名，不然插入会报错。

```json
{
	"_id": "1",
	"books": [
        {
            "num": 3,
            "bookname": "HelloWorld",
            "ISBN": 1
        },
        {
            "num": 4,
            "bookname": "Hate",
            "ISBN": 2
        }
    ],
    "totalPrice": 586.31
}
```

```json
{
    "ok": "sign up successfully"
}
```



### show order

GET /api/get/order

```json
{
	"_id": "22"
}
```

```json
{"orders":[{"books":[{...},{...}],"orderId":528,"createTime":"2019-03-13 14:16:06.0"}
]}
```



### remove from cart

DELETE /api/delete/remove

~~~json
{
    "_id":"1",
    "bookname":"HelloWorld",
    "ISBN": 1
}
~~~

~~~json
{
    "ok": "remove from cart successfully"
}
~~~



### ban user

PUT /api/manage/ban

~~~json
{
    "_id":"2"
}
~~~

~~~json
{
    "ok": "ban/lift successfully"
}
~~~

~~~json
403error  sorry you can't ban a manager
~~~



### delete book

DELETE /api/manage/delete

~~~json
{
    "_id":"2",
    "bookname":"qwe",
    "ISBN": 1
}
~~~

~~~json
{
    "ok": "delete book successfully"
}
~~~

