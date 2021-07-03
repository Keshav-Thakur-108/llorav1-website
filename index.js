const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      config = require('./config/key')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log('Database connected'))
.catch((err) => console.log(err))


const PORT = process.env.PORT
app.listen(PORT || 3000, () => {
    console.log("The server is started")
})