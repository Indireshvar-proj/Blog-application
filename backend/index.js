const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require("body-parser")
require('dotenv').config({path: '.env'});

const port = process.env.PORT || 5000
const DB = process.env.MONGODB_URI;
const app = express();
var ObjectId = require('mongodb').ObjectID;
app.use(cors())


app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URI)
mongoose.connect(DB).then(()=> console.log("MongoDB connected")).catch((err)=> console.log(err));

app.use(express.json())

app.get('/', (req, res) => {
    res.json("Server Heroku started")
})

const userRouter = require('./routes/User.route')
app.use('/api/user',userRouter)


const blogRouter = require('./routes/Blog.route')
app.use('/api/blog',blogRouter)


app.listen(port, () => {
    console.log("Server Started at Port " + port)
})