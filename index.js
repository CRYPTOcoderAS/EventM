const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const userRoute = require('./routes/user')
const interestRoute = require('./routes/interest')

require('dotenv').config()
 
app.use(cors())
app.use(express.json())
app.use(morgan())
app.use(express.urlencoded({ extended: true })) 

const port = process.env.PORT;

app.use('/api/user', userRoute);
app.use('/api/interest', interestRoute);

mongoose.connect('mongodb+srv://devo_bhai:devo@cluster0.y70v98m.mongodb.net/Users?retryWrites=true&w=majority')
.then(() => {
  console.log('Connected to MongoDB')
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
  })
})

