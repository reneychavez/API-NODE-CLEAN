const express = require('express');
const { classes } = require('istanbul-lib-coverage');
const router = express.Router();
const mongoose = require('mongoose');
const AccountModel = mongoose.model('Account');

module.exports = () => {
 router.post('/signup', new SignupRouter().route);
}

class SignupRouter {
    async route (req, res) {
        const { email, password, repeatPassword } = req.body;
        new signUpUseCase().signUp(email, password, repeatPassword)
        res.status(400).json({ error: 'Password is not conference '})
    }
}

class signUpUseCase {
    async signUp (email, password, repeatPassword) {
        if (password === repeatPassword) {
            new AddAccountRepository().add(email, password)
        }
    }
}

class AddAccountRepository {
    async add (email, password, repeatPassword) {
            const user = await AccountModel.create({email, password})
            return user 
    }
}

