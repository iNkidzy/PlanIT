const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

const TodolistRoutes = require('./routes/Todolist')
const spaceFunRoutes = require('./routes/spaceFun')
const projectRoutes = require('./routes/project')
const authRoutes = require("./routes/auth");

require('dotenv').config();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})) // to allow cross origin requests

app.use(bodyParser.json()) // to convert the request into JSON


mongoose
    .connect(process.env.MONGO_URI, {
        
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then(() => console.log('Success: Connected to MongoDB'))
    .catch((err) => console.log(err))

//Define routes directly here
app.get("/api/welcome", (req, res) => {
    res.status(200).send({ message: "Welcome to PlanIT :) " });
})

app.use('/api/todolist', TodolistRoutes)
app.use('/api/spaceFun', spaceFunRoutes)

app.use('/api/projects', projectRoutes)


//for authentication
app.use("/api/user", authRoutes);


app.listen(process.env.PORT, () => console.log(`Success: App running at http://localhost:${process.env.PORT}`))

module.exports = app;