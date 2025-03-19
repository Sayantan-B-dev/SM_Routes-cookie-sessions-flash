const express = require('express');
const app = express();
const port = 3005;
const router = require('./routes/test');
const cookieParser = require('cookie-parser');
app.use(cookieParser('checkSecret'));

app.use('/test',router)


app.listen(port, () => {
  console.log('Server is running on port 3005');
});
