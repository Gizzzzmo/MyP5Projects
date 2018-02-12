
const express = require('express')
const path = require('path')
const app = express()
console.log('kek')
app.use('/', express.static(path.join(__dirname, './')));

app.listen(3000);