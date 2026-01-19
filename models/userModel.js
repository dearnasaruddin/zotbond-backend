const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema

const UserModel = new Schema({
    firstName: {
        type: String,
        require: true,
        trim: true,
        text: true,
        minlength: [3, "FirstName shouldn't be less then 3 characters"],
        maxlength: [20, "FirstName shouldn't be more then 20 characters"]
    },
    lastName: {
        type: String,
        trim: true,
        text: true
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        text: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)
            },
            message: (prop)=>`Invalid email: ${prop.value}`
        }
    },
    password: {
        type: String,
        require: true
    },
    profilePicture: {
        type: String,
        default: ''
    },
    cover: {
        type: String,
        trim: true
    },
    birthMonth: {
        type: Number,
        require: true,
        trim: true
    },
    birthDay: {
        type: Number,
        require: true,
        trim: true
    },
    birthYear: {
        type: Number,
        require: true,
        trim: true
    },
    gender: {
        type: String,
        require: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    friends: [
        {
            type: ObjectId,
            ref: 'usermodel'
        }
    ],
    followers: [
        {
            type: ObjectId,
            ref: 'usermodel'
        }
    ],
    following: [
        {
            type: ObjectId,
            ref: 'usermodel'
        }
    ],
    request: [
        {
            type: ObjectId,
            ref: 'usermodel'
        }
    ],
    search: [
        {
            user: {
                type: ObjectId,
                ref: 'usermodel',
                require: true,
                text: true
            },
            createdAt: {
                type: Date,
                require: true
            }
        }
    ],
    details: {
        bio: {
            type: String
        },
        otherName: {
            type: String
        },
        job: {
            type: String
        },
        currentCity: {
            type: String
        },
        homeTown: {
            type: String
        },
        workPlace: {
            type: String
        },
        college: {
            type: String
        },
        highSchool: {
            type: String
        },
        relationship: {
            type: String,
            enum: [
                "Single",
                "In A Relationship",
                "It's Complicated",
                "Married",
                "Divorced"
            ]
        },
        instagram: {
            type: String
        }
    },
    savePost: [
        {
            post: {
                type: ObjectId,
                ref: 'post'
            },
            savedAt: {
                type: Date,
                require: true
            }
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model('usermodel', UserModel)