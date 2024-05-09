const express = require('express');
const app = express();
const userRoutes = require('./person.js');
const taskRoutes = require('./app.js');
const dotenv = require('dotenv');


app.use(express.json());
dotenv.config();
app.use('/api', userRoutes);
app.use('/api',taskRoutes);

const port = 3000;
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});