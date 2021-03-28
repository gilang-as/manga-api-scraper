require('dotenv').config();
const express = require('express');
const post = require("./hanlder/posts")
const app = express();
const port = process.env.APP_PORT;

app.use(express.json());

app.get('/post', post.GetPost);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})