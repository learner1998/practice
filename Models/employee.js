const mongoose = require('mongoose');
var validator = require('validator');
const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'please specify First Name'],
        trim: true,
        maxlength: [20, 'FirstName cannot be more than 20 characters!']
    },

    lastName: {
        type: String,
        trim: true,
        // maxlength: [20, 'lastName cannot be more than 20 characters!']
    },

    email: {
        type: String,
        trim: true,
        lowercase: true,
        // unique: true,
        // required: [true,'Email address is required'],
        // validate: {
        //     validator: validator.isEmail,
        //     message: 'invalid email',
        // }
    },

    maritalStatus: {
        type: String,
        // required:[true, 'Choose the Gender']
    },

    dateOfBirth: {
        type: Date,
        // required: [true, 'Date of Birth is required!']
    },

    profile: {
        type: String,
        lowercase: true
    },

    contactDetails: {
        adressLine1: {
            type: String
        },
        adressLine2: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        zipCode: {
            type: Number
        },
        country: {
            type: String
        },
        contact: {
            type: Number,
            match: [
                /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                'Phone number is not valid!'
            ]
        },
    },

    bankDetails:{
        bankName:{
            type:String,
        },
        accountNumber:{
            type:Number
        },
        accountName:{
            type:String
        },
        ifscCode:{
            type:String
        }

    },
    dateOfJoining:{
        type: Date,
    },

    createdAt: {
        type: Date,
        default: Date.now
    },


});


module.exports = mongoose.model('Employee', employeeSchema)