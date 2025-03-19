const express = require('express');// this is used to import express
const router = express.Router();// this is used to create a router


router.get('/', (req, res) => {
    res.send(req.signedCookies);    // signedCookies is used to get signed cookies
});
router.get('/edit', (req, res) => {
    res.cookie("test", "test cookie",{signed:true}); // signed:true is used to sign the cookie
    res.send("test edit"); // this will set the cookie
});
router.get('/:id', (req, res) => {
    res.cookie("last visited id", `${req.params.id}`); // this will set the cookie
    res.send("a perticular test"); // this will set the cookie
});
router.get('/:id/edit', (req, res) => {
    res.send("a perticular test edit");
});

module.exports = router;