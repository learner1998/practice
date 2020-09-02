const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const { login , deleteAppuser, getAppUser, updateAppUser, getAppUsers, createAppUser} = require('../controllers/appUserController');
router
.route('/')
.get(getAppUsers)
.post(createAppUser)

router
.route('/login')
.post(login)

router
.route('/:id')
.get(getAppUser)
.patch(updateAppUser)
.delete(deleteAppuser)


module.exports = router