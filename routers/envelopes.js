const express = require('express');
const envelopes = express.Router();
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
const envBodyValidation = [
    body('envelopeName').notEmpty().isLength({min: 1, max: 29}).trim().escape(),
    body('monthLimit').isNumeric().trim().escape(),
    body('currentMoney').isNumeric().trim().escape()
];

//controllers
const {
    getEnvelopes,
    getEnvelopeById,
    getEnvelopeTransactions,
    createEnvelope,
    updateEnvelope,
    deleteEnvelope
} = require('../controllers/envelopes');

//routes
envelopes.get('/', getEnvelopes);
envelopes.get('/:id/transactions', idValidation, getEnvelopeTransactions);
envelopes.get('/:id', idValidation, validate, getEnvelopeById);
envelopes.post('/', envBodyValidation, validate, createEnvelope);
envelopes.put('/:id', idValidation, envBodyValidation, validate, updateEnvelope);
envelopes.delete('/:id', idValidation, validate, deleteEnvelope);

module.exports = envelopes;