const express = require('express')
const cors = require('cors')
const { getEvents , addEvent, getEventById, deleteEvent, updateEvent, eventSearch } = require('./src/events')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/events/search', eventSearch)
app.get('/events/:eventId', getEventById)
app.get('/events', getEvents)

app.post('/events', addEvent)

app.delete('/events/:eventId', deleteEvent)

app.patch('/events/:eventId', updateEvent)

app.listen(5000, () => {
    console.log('Connected on port 5000')
})