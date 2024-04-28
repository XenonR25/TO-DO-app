const express = require('express')
const bodyparser = require('body-parser')

const app = express();
const port = 5000;

//middleware
app.use(bodyparser.json());

app.listen(port,()=> 
console.log(`Server Running on port : http://localhost:${port}`))