const express = require('express')
const router = express.Router();
const userController = require('../controllers/user')
const mids = require('../middlewares/protect')



router.post('/', userController.addUser)
router.post('/login', userController.login)
router.delete('/', mids.protect, userController.deleteUser)
router.put('/:id/interest/', mids.protect, userController.addInterest)
router.get('/', mids.protect, userController.getUserDetails)
router.get('/all', mids.protect, userController.getAllUsers);


// events handlers  
router.get('/events', mids.protect, userController.getAllEvents)
router.put('/event/:id', mids.protect, userController.registerForEvents)
router.get('/events/registered', mids.protect, userController.fetchRegisteredEvents)



module.exports = router