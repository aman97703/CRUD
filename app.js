const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv')
dotenv.config({path:'config.env'})
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connectDB = require('./server/database/connection');
const controller = require('./server/controller/controller')

const port = 3000 || process.env.PORT;

app.use(morgan('tiny')) // log requests
connectDB(); // mongo db connection

app.use(bodyParser.urlencoded({extended:true})); // parse request to body parser
app.set('view engine', 'ejs') // template engine

app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

// load routers
app.use('/',require('./server/route/router'));

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})