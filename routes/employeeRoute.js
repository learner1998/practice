const express = require('express')
const router = express.Router();



const {getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee } = require('../controllers/employeeController')
router
.route('/')
.get(getEmployees)
.post(createEmployee)

router
.route('/:id')
.get(getEmployee)
.patch(updateEmployee)
.delete(deleteEmployee)


module.exports = router