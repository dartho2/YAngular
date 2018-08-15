const express = require('express')
const router = express.Router()
const User = require ('../models/users')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const db = "mongodb://darth:pawel1988@ds217002.mlab.com:17002/angulardb"
mongoose.connect(db, err => {
    if (err) {
        console.error("Someone Error!" + err )
    } else {
        console.log("DB connected")
    }
})

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    } 
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.useId = payload.subject
    next()
}
router.get('/users', (req,res) => { 
    User.find({}, (err,users) => {
        res.json(users)
    })
})
router.get('/users/:usersId', (req,res) => {
   // User.findById(req.params.usersId, (err,users) => {
   User.find({email: req.params.usersId}, (err,users) =>{
    res.json(users)
   

    })
})
router.get('/', (req, res) => {
    res.send('From API')
})

router.post('/register', (req, res) =>{
    let userData = req.body
    let user = new User(userData)
    user.save((err, regiseredUser) => {
        if (err) {
            console.log(err)
        } else {
            let payload = { subject: regiseredUser._id}
            let token = jwt.sign( payload, 'secretKey')
            res.status(200).send({token})
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
                   let payload = { subject: user._id }
                   let token = jwt.sign(payload, 'secretKey')
                   res.status(200).send({token})
               }
            }
        }
    })

})
router.get('/events', verifyToken, (req, res ) => {
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
router.get('/special', verifyToken, (req,res) => { 
    User.find({}, (err,users) => {
        res.json(users)
    })
})
// router.get('/special', verifyToken, (req, res ) => {
//     let events = [
//  {
//      "_id": "1",
//      "name": "dupa",
//      "description": "dupaa",
//      "date": "2010-10-29 05:40:23"
//  },
//  {
//     "_id": "2",
//     "name": "dupa2",
//     "description": "dupaa2",
//     "date": "2010-10-29 05:40:23"
// }
// ]
// res.json(events)
// })
module.exports = router