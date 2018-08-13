const express = require('express')
const router = express.Router()
const User = require ('../models/users')
const mongoose = require('mongoose')

const db = "mongodb://darth:pawel1988@ds217002.mlab.com:17002/angulardb"
mongoose.connect(db, err => {
    if (err) {
        console.error("Someone Error!" + err )
    } else {
        console.log("DB connected")
    }
})

router.get('/', (req, res) => {
    res.send('From API')
})

router.post('/register', (req, res) =>{
    let userData = req.body
    let user = new User(userData)
    user.save((err, regiseredUser) => {
        if (err) {
            console.log(error)
        } else {
            res.status(200).send(regiseredUser)
            console.log(regiseredUser)
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body
    
    User.findOne({email: userData.email}, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send('Invalid login')
            }
            else {
               if (user.password !== userData.password) {
                   res.status(401).send('Invalid Password')
               } else {
                   res.status(200).send(user)
               }
            }
        }
    })

})
router.get('/events', (req, res ) => {
    let events = [
 {
     "_id": "1",
     "name": "dupa",
     "description": "dupaa",
     "date": "2010-10-29 05:40:23"
 },
 {
    "_id": "2",
    "name": "dupa2",
    "description": "dupaa2",
    "date": "2010-10-29 05:40:23"
}
]
res.json(events)
})
router.get('/special', (req, res ) => {
    let events = [
 {
     "_id": "1",
     "name": "dupa",
     "description": "dupaa",
     "date": "2010-10-29 05:40:23"
 },
 {
    "_id": "2",
    "name": "dupa2",
    "description": "dupaa2",
    "date": "2010-10-29 05:40:23"
}
]
res.json(events)
})
module.exports = router