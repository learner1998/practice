const mongoose = require('mongoose');
var validator = require('validator');
const appUserSchema = new mongoose.Schema({
    // AppUserId: mongoose.Types.ObjectId(),
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
        validate:{
        validator: validator.isEmail,
        message: 'invalid email',
      }
   },

    createdAt:{
        type:Date,
        default: Date.now
    }


  });


  module.exports = mongoose.model('AppUser',appUserSchema)




