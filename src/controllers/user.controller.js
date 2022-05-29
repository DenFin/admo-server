const UserService = require("../services/UserService");
const UserServiceInstance = new UserService();

exports.getAllUsers = async function(req, res, next) {
    try {
        const users = await UserServiceInstance.getAllUsers()

        if (req.query.email) {
            let email = req.query.email
            const user = await UserServiceInstance.getUserByEmail(email)
            console.log({ email, user })

            if (user.length > 0) {
                console.log("USER ALREADY EXISTS")
            }
        } else {
            console.log("NO PARAMS")
        }


        return res.status(200).json({ status: 200, data: users })
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message })
    }

}
