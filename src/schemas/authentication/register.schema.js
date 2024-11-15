import { body } from 'express-validator';

export const validateRegister = [
    body('name')
        .isString()
        .withMessage('Name is required and should be a string')
        .notEmpty()
        .withMessage('Name is required'),
    
    body('email')
        .isEmail()
        .withMessage('Email must be a valid email address')
        .notEmpty()
        .withMessage('Email is required'),
    
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .notEmpty()
        .withMessage('Password is required'),
];

// export const validateLogin = [
//     body('email')
//         .isEmail()
//         .withMessage('Email must be a valid email address')
//         .notEmpty()
//         .withMessage('Email is required'),
    
//     body('password')
//         .notEmpty()
//         .withMessage('Password is required'),
// ];
