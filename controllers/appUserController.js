const Appuser = require('../Models/appuser')



exports.getAppusers = async (req, res) => {
    console.log('Hello');

    try {
        const appusers = await Appuser.find({})
        res.status(200).send(appusers)
    } catch (e) {
        res.status(500).send()
    }

}


exports.getAppuser = async (req, res) => {
    try {
        const appuser = await Appuser.findById({_id: req.params.id})
        if(!appuser){
            return res.status(404).json({
                message:'Not Found!'
            })
        }
        res.status(200).json({
            message:'Found!',
            data:appuser
        })
    } catch (e) {
        res.status(500).json({
            message:'Internal Server Error!'
        })
    }
}


exports.createAppuser = async (req, res) => {
    const employee = new Appuser(req.body);
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




exports.updateAppuser = async(req, res) => {
    try {
        const appuser = await Appuser.findByIdAndUpdate(req.params.id,req.body,{
            runValidators:true,
            new:true
        })
        console.log(appuser);
       if (!appuser) {
           return res.status(404).json({ message: 'Not Found!'})
       }
       res.status(200).json({
        message: "Updated!",
        data: appuser
    })

   } catch(e){
       res.status(500).json({ message: "Internal Server Error" })
   }
}

exports.deleteAppuser = async (req, res) => {
    try {
         const appuser = await Appuser.findByIdAndDelete({_id: req.params.id})
        if (!appuser) {
            return res.status(404).json({
                message: 'Not Found!'
            })
        }
        res.status(200).json({
            message: "Deleted!",
            data: appuser
        })
    } catch(e){
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
}