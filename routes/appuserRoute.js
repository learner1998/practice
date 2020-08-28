const express = require('express')
const router = express.Router();
const { getAppusers, createAppuser, getAppuser, updateAppuser, deleteAppuser } = require('../controllers/appUserController');

router
.route('/')
.get(getAppusers)
.post(createAppuser)

router
.route('/:id')
.get(getAppuser)
.patch(updateAppuser)
.delete(deleteAppuser)


module.exports = router