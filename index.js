const express = require('express')
const cors = require('cors')
const { getEvents , addEvent } = require('./src/events')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/events', getEvents)

app.post('/events', addEvent)

app.listen(5000, () => {
    console.log('Connected on port 5000')
})