const jwt = require('jsonwebtoken');
const AppUser = require('../Models/appuser');
// const auth = async(req,res,next)=>{
//   try {
//     const token = req.headers.authorization.split('Bearer ')[1]
//     const decoded = jwt.verify(token, 'newappuser')
//     const appUser = await AppUser.findOne({_id:decoded._id,'tokens.token':token})
//     if (!appUser) {
//       throw new Error();
//     } 
//     req.appUser= appUser
//     next()
//   } catch (e) {
//     res.status(401).send('Please authenticate' + e)
//   }
// };

// module.exports = auth


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'newappuser')
        const appUser = await AppUser.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!appUser) {
            throw new Error()
        }
        req.appUser = appUser
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' + e })
    }
}

module.exports = auth