# Routing, Cookies, Sessions, and Flash in Express.js

## Table of Contents
1. [Routing with Express](#routing-with-express)
2. [Cookies](#cookies)
3. [Sessions](#sessions)
4. [Flash Messages](#flash-messages)

---

## Routing with Express

Routing in Express.js allows you to define how your application responds to client requests for specific endpoints. It supports HTTP methods like `GET`, `POST`, `PUT`, and `DELETE`.

### Example:
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

app.post('/submit', (req, res) => {
    res.send('Form Submitted!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

### Diagram:
```plaintext
Client Request --> Express Router --> Controller Logic --> Response
```

---

## Cookies

Cookies are small pieces of data stored on the client-side. They are used for session management, personalization, and tracking.

### Installing Cookie Parser:
```bash
npm install cookie-parser
```

### Example:
```javascript
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

app.get('/set-cookie', (req, res) => {
    res.cookie('username', 'JohnDoe', { maxAge: 900000 });
    res.send('Cookie has been set!');
});

app.get('/get-cookie', (req, res) => {
    const username = req.cookies.username;
    res.send(`Cookie Value: ${username}`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

---

## Sessions

Sessions store user data on the server-side and are often used with cookies for authentication.

### Installing Express Session:
```bash
npm install express-session
```

### Example:
```javascript
const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: true
}));

app.get('/set-session', (req, res) => {
    req.session.user = 'JohnDoe';
    res.send('Session has been set!');
});

app.get('/get-session', (req, res) => {
    const user = req.session.user;
    res.send(`Session Value: ${user}`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

---

## Flash Messages

Flash messages are temporary messages stored in the session. They are commonly used for notifications.

### Installing Connect Flash:
```bash
npm install connect-flash
```

### Example:
```javascript
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();

app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

app.get('/flash', (req, res) => {
    req.flash('info', 'Flash Message Added!');
    res.redirect('/show-flash');
});

app.get('/show-flash', (req, res) => {
    const message = req.flash('info');
    res.send(`Flash Message: ${message}`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

---

## Summary Diagram

```plaintext
Routing:
Client --> Express Router --> Controller Logic --> Response

Cookies:
Client <--> Cookie Parser Middleware <--> Server

Sessions:
Client <--> Session Middleware <--> Server (Session Store)

Flash:
Client --> Flash Middleware --> Session --> Temporary Message
```

---  