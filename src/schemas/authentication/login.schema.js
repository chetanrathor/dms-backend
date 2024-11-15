import { body } from 'express-validator';

export const validateLogin = [
    body('email')
        .isEmail()
        .withMessage('Email must be a valid email address')
        .notEmpty()
        .withMessage('Email is required'),
    
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
];