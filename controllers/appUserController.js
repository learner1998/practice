const AppUser = require('../Models/appuser')
const auth = require('../middleware/auth')



exports.getAppUsers = async(req, res) => {
    const appUser = await req.appUser
    res.send(appUser)
}



exports.getAppUser = async (req, res) => {
    try {
        const appUser = await AppUser.findById({
            _id: req.params.id
        })
        if (!appUser) {
            return res.status(404).json({
                message: 'Not Found!'
            })
        }
        res.status(200).json({
            message: 'Found!',
            data: appUser
        })
    } catch (e) {
        res.status(500).json({
            message: 'Internal Server Error!'
        })
    }
}


exports.createAppUser = async (req, res) => {
    const appUser = new AppUser(req.body);
    try {
        await appUser.save()
        const token = await appUser.generateAuthToken()
        res.status(201).json({
            message: "Created!",
            data: {appUser,token}
        })
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.login = async (req, res) => {
    try {
    const appUser = await AppUser.findByCredentials(req.body.email,req.body.password)
    const token = await appUser.generateAuthToken()
        res.status(200).json({
            message: "logged in!",
            data: {appUser,token}
        })
    } catch (e) {
        res.status(404).json({
            message: 'Unable to Login!'
        })
    }
}



exports.updateAppUser = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['organisationName', 'website', 'contact', 'email', 'password']
    isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).json({
            message: "invalid Update!"
        })
    }

    try {
        const appUser = await AppUser.findById(req.params.id)
        if (!appUser) {
            return res.status(404).json({
                message: 'Not Found!'
            })
        }
        updates.forEach((update) => appUser[update] = req.body[update])
        await appUser.save()

        res.json({
            message: "Updated!",
            data: appUser
        })

    } catch (e) {
        res.status(500).json({
            message: "Internal Server Error" 
            + e
        })
    }
}

exports.deleteAppuser = async (req, res) => {
    try {
        const appuser = await AppUser.findByIdAndDelete({
            _id: req.params.id
        })
        if (!appuser) {
            return res.status(404).json({
                message: 'Not Found!'
            })
        }
        res.status(200).json({
            message: "Deleted!",
            data: appuser
        })
    } catch (e) {
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
}