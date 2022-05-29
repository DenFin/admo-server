const User = require('../models/user.model')

class UserService {

    constructor(email, username, password) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.registeredAt = new Date();
    }

    async getAllUsers() {
        return User.find();
    }

    async getUserByEmail(email) {
        return User.find({
            email: email
        })
    }

}

module.exports = UserService