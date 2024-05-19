const {check} = require('express-validator')

exports.ingredientCreateValidator = [
    check('name')
        .notEmpty()
        .withMessage('Name is required')
        .isString()
        .withMessage('Name must be a string'),
    check('cost')
        .notEmpty()
        .withMessage('Price is required')
        .isFloat()
        .withMessage('Price must be a number'),
    check('stock')
        .isNumeric()
        .withMessage('Stock must be a number'),
    check('categoryId')
        .notEmpty()
        .withMessage('Category is required')
        .isNumeric()
        .withMessage('Category must be a number')

]
