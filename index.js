// all require 
const express = require('express')
const app = express()
const cors= require('cors')
let jwt = require('jsonwebtoken');
require ('dotenv').config()


// port 
const port = process.env.PORT || 5000




// midllewire 
app.use(cors())
app.use(express.json())




