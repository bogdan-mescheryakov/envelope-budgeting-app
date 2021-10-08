const express = require('express');
const transactions = express.Router();
const { body, param, validationResult } = require('express-validator')

//valid-sanit helpers
function validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
}
const idValidation = [
    param('id').notEmpty().isInt().trim().escape()
];
const transBodyValidation = [
    body('envelopeId').notEmpty().isInt().trim(),
    body('paymentAmount').notEmpty().isNumeric().trim()
];
//controllers
const {
    getTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction
} = require('../controllers/transactions');
//routes
transactions.get('/', getTransactions);
transactions.get('/:id', idValidation, validate, getTransactionById);
transactions.post('/', transBodyValidation, validate, createTransaction);
transactions.put('/:id', idValidation, transBodyValidation, validate, updateTransaction);
transactions.delete('/:id', idValidation, validate, deleteTransaction);

module.exports = transactions;