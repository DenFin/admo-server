const { body } = require('express-validator');

exports.validateContact = (req, res, next) => {
    body('firstname', 'firstname does not exist').exists()
    next()
}