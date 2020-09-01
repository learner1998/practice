const mongoose = require('mongoose');
var validator = require('validator');
const bcrypt = require('bcryptjs')

const appUserSchema = new mongoose.Schema({
    organisationName:{
        type:String,
        required:[true,'please specify an organisation name'],
        unique:true,
        trim:true,
        maxlength:[50,'Name cannot be more than 50 characters!']
    },
    website:{
        type:String,
        match:[
            /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
           'please add a valid url with HTTP OR HTTPS'
        ]
    },

    contact:{
        type:Number,
        match:[
            /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
            'Phone number is not valid!'
        ]
    },

   email:{
       type:String,
       unique:true,
        validate:{
        validator: validator.isEmail,
        message: 'invalid email',
      }
   },
   password:{
    type:String
   },

    createdAt:{
        type:Date,
        default: Date.now
    }

  });


  appUserSchema.statics.findByCredentials = async (email, password) => {
    const user = await AppUser.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}


  //hashing password before saving and updating!
  appUserSchema.pre('save', async function(next){
    const appUser = this
    if(appUser.isModified('password')){
        appUser.password = await bcrypt.hash(appUser.password,8)
    }
    next()
  })
  const AppUser = mongoose.model('AppUser', appUserSchema)
  module.exports = AppUser





