const express = require('express')
const server = express()
const port = 5000
const cors = require('cors')

server.use(cors())
server.use(express.json())
server.use('/auth', require('./routes/auth'))
server.use('/data', require('./routes/Functions'))

server.listen(port, () => {
    console.log('Server Started Successfully :)',port)
})

