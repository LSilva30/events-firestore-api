const { request, response } = require('express')
const firebase = require('firebase-admin')
const credentials = require('../credentials.json')

function connectDb() {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      credential: firebase.credential.cert(credentials)
    })
  }
  return firebase.firestore()
}

exports.getEvents = (req, res) => {
  const db = connectDb()
  db.collection('events').get()
    .then(eventsCollection => {
     const allEvents = eventsCollection.docs.map(doc => {
        let events = doc.data()
        events.id = doc.id
        return events
      })
      res.send(allEvents)
    })
    .catch(err => console.log(err))
}

// create a POST request - to add new events

exports.addEvent = (req, res) => {
  const db = connectDb()
  db.collection('events')
    .add(req.body)
    .then(doc => res.send(doc))
    .catch(err => res.status(500).send('Event could not be created'))
}

// create GET - ONE event request

exports.getEventById = (req, res) => {
  const db = connectDb()
  db.collection('events').doc(req.params.eventId).get()
  .then(eventDoc => {
    const event = eventDoc.data()
    event.id = eventDoc.id
    res.send(event)
  })
  .catch(err => res.status(500).send('Could not find event by Id'))
}

// create DELETE request - to delete one event 

exports.deleteEvent = (req, res) => {
const db = connectDb()
const { eventId } = req.params
db.collection('events').doc(eventId).delete()
.then(() => res.status(200).send('Event was deleted.'))
.catch(err => res.status(500).send('Could not delete event by Id'))
}

// create PATCH request - to update one event
exports.updateEvent = (req, res) => {
const db = connectDb()
const { eventId } = req.params
db.collection('events').doc(eventId).update(req.body)
.then(res.status(200).send('Event was updated succesfully!'))
.catch(err => res.status(500).send('Could not update event!'))
}

// make a SEARCH request - to find one event
exports.eventSearch = (req, res) => {
  const { eventName } = req.query
  const db = connectDb()
  db.collection('events').where('name', '==', eventName).get()
  .then(eventsCollection => {
    const matches = eventsCollection.docs.map(doc => {
      let event = doc.data()
      event.id =  doc.id
      return event
    })
    res.send(matches)
  })
  .catch(err => res.status(500).send('Could not find event'))
}