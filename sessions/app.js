const express = require('express');
const app = express();
const session = require('express-session');

app.use(session({secret: 'abc123',resave: false,saveUninitialized: false}));//secret is used to sign the session ID cookie


app.get('/register', (req, res) => {
    const {username}=req.query
    req.session.username = username;
    res.redirect('/viewcount');
})

app.get('/viewcount', (req, res) => {
    if(req.session.count) {
        req.session.count += 1;
    } else {
        req.session.count = 1;
    }
    res.send(`You have viewed this page ${req.session.count} times, Welcome back, ${req.session.username}`);
});



app.listen(3000, () => {    
    console.log("Listening on port 3000");
});