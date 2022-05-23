const { check } = require('express-validator');
const { validationResult } = require('express-validator');
const db = require('../models');
const User = db.usuarios;

module.exports = {
  
    createUser: {
        validateEmail: [
            check('email')
            // To delete leading and triling space
            .trim()
            // Normalizing the email address
            .normalizeEmail()
            // Checking if follow the email 
            // address formet or not
            .isEmail()
            // Custom message
            .withMessage('E-mail Inválido') 
            // Custom validation
            // Validate email in use or not
            .custom(async (email = req.body.email) => {
                const existingUser = await User.findOne({ 
                        where: {email: email
                    },
                    attributes: ['email'],
                    paranoid: false 
                });
                
                if (existingUser) {
                    throw new Error('E-mail já esta sendo utilizado');
                }
            })
        ],
        handler: async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ 
                    error_message: errors.array() 
                });
            }
            return next();
        },
    }
}