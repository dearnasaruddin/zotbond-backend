const User = require('../models/userModel')
const { emailValidate, lengthValidate, usernameValidate } = require('../helpers/validation')
const bcrypt = require('bcrypt')
const jwToken = require('../helpers/token')

const newUser = async (req, res) => {
    try {

        const {
            firstName,
            lastName,
            email,
            password,
            birthMonth,
            birthDay,
            birthYear,
            gender
        } = req.body

        // ============ Validation ============
        if (!firstName) return res.status(400).json({ massage: "firstName shouldn't be empty" })
        if (!email) return res.status(400).json({ massage: "email shouldn't be empty" })
        if (!password) return res.status(400).json({ massage: "password shouldn't be empty" })

        if (!emailValidate(email)) return res.status(400).json({ message: "Invalid Email Address" })
        const userExist = await User.findOne({ email })
        if (userExist) return res.status(400).json({ message: "Email Already Exists" })
        if (!lengthValidate(firstName, 3, 20)) return res.status(400).json({ massage: "firstName should be between 3-20 characters" })
        if (lastName) {
            if (!lengthValidate(lastName, 3, 20)) return res.status(400).json({ massage: "lastName should be between 3-20 characters" })
        }
        if (!lengthValidate(password, 8, 30)) return res.status(400).json({ massage: "password should be between 8-30 characters" })

        // bcrypt Password & Username Generate
        const encryptedPassword = await bcrypt.hash(password, 10)
        const username = await usernameValidate(String(firstName + lastName).toLowerCase())

        const newUser = await new User({
            firstName,
            lastName,
            username,
            email,
            password: encryptedPassword,
            birthMonth,
            birthDay,
            birthYear,
            gender
        }).save()

        
        const emailToken = jwToken({ id: newUser._id.toString() }, "30m")
        
        delete newUser._doc.password
        res.status(201).json({ massage: 'User Created Successfully', user: newUser })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: 'User Creation failed'
        })
    }
}

module.exports = newUser