const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()

const db = require('./models')
const dbConfig = require("./config/db-config")

//allows api calls to other servers
app.use(cors())

//allows us to get data from POST request
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//connect to db
//connect on compass using mongodb://localhost/user_db
//`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`
db.mongoose
    .connect(dbConfig.uri, { 
        useNewUrlParser: true, useUnifiedTopology: true 
    })
    .then(() => {
        console.log("Connected to DB")
    })
    .catch(err => {
        console.log("DB error:", err)
        process.exit()
    })
//routes
app.use(require('./routes/auth-routes'))
app.use(require('./routes/user-routes'))
app.use(require('./routes/admin-routes'))
app.get("/", (req, res) => {
    res.json({ message: "Welcome!"})
})


//set port (5000 default, env file to specify)
const port = process.env.PORT || 5000;

// Accessing the path module
const path = require("path");

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build"));
});

//launch server
app.listen(port, () => {
    console.log('Server started on port ', port)
})