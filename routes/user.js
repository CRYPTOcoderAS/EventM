const express = require('express')
const router = express.Router();
const userController = require('../controllers/user')
const mids = require('../middlewares/protect')


// user handlers
router.post('/', userController.addUser)
router.post('/login', userController.login)
router.delete('/', mids.protect, userController.deleteUser)
router.put('/:id/interest', mids.protect, userController.addInterest)
router.get('/', mids.protect, userController.getUserDetails)
 
// events handlers 
router.get('/events', mids.protect, userController.getAllEvents)
// router.get('/events/suggestions', mids.protect, userController.suggestEvents)
// router.put('/event/:id', mids.protect, userController.registerForEvent)
// router.get('/events/registered', mids.protect, userController.getRegisteredEvents)

module.exports = router