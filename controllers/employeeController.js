
const Employee = require('../Models/employee')
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({})
       if(!employees){
        res.status(404).json({
            message:'Not Data Found!'
        })
       }
        res.status(200).json({
            message:'Data Found!',
            data:employees
        })
    } catch (e) {
        res.status(500).send()
    }
}
exports.getEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById({_id: req.params.id})
        if(!employee){
            return res.status(404).json({
                message:'Not Found!'
            })
        }
        res.status(200).json({
            message:'Found!',
            data:employee
        })
    } catch (e) {
        res.status(500).json({
            message:'Internal Server Error!'
        })
    }
}


exports.createEmployee= async (req, res) => {
    const employee = new Employee(req.body);
    try {
        await employee.save()
        res.status(201).json({
            message: "Created!",
            data: employee
        })
    } catch (e) {
        res.status(500).send(e);
    }
}


exports.updateEmployee = async(req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id,req.body,{
            runValidators:true,
            new:true
        })
       if (!employee) {
           return res.status(404).json({ message: 'Not Found!'})
       }
       res.status(200).json({
        message: "Updated!",
        data: employee
    })

   } catch(e){
       res.status(500).json({ message: "Internal Server Error" })
   }
}

exports.deleteEmployee = async (req, res) => {
    try {
         const employee = await Employee.findByIdAndDelete({_id: req.params.id})
        if (!employee) {
            return res.status(404).json({
                message: 'Not Found!'
            })
        }
        res.status(200).json({
            message: "Deleted!",
            data: employee
        })
    } catch(e){
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
}