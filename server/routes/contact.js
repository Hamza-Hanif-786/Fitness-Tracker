import express from 'express'
import ContactModel from '../models/Contact.js'

const contactRouter = express.Router()

const isValidEmail = (email) => {
    return email && email.includes('@') && email.includes('.') && email.includes('@gmail.com' || '@yahoo.com' || '@outlook.com')
}

contactRouter.post('/', async (req, res) => {
    const { firstname, lastname, email, phone, message } = req.body

    if(!firstname || firstname.trim() === ''){
        return res.status(400).json({ message: 'Firstname is required' })
    }

    if(!lastname || lastname.trim() === ''){
        return res.status(400).json({ message: 'Lastname is required' })
    }

    if(!email || !isValidEmail(email)){
        return res.status(400).json({ message: 'Valid email is required' })
    }

    if(!phone || phone.trim() === ''){
        return res.status(400).json({ message: 'Phone number is required' })
    }

    if(!message || message.trim() === ''){
        return res.status(400).json({ message: 'Message is required' })
    }

    // Save the contact message to the database
    try {
            const newContact = new ContactModel(req.body)
            await newContact.save()
            res.status(201).json({ message: 'Contact message send successfully' })
        } catch (error) {
            console.error('Error sending message', error)
            res.status(500).json({ message: 'Error sending message' })
        }
})

export default contactRouter
