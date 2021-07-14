const { response, request } = require('express')
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
  db.collection('events')
    .get()
    .then(allEvents => {
      allEvents.docs.map(doc => {
        console.log(doc.data())
      })
      res.send('got all events')
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
