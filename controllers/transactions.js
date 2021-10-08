const { Transaction, Envelope } = require('./../models')

// transaction queries
const getTransactions = async (req, res) => {
    const result = await Transaction.findAll({
        order: ['id']
    });
    return res.json(result);
}

const getTransactionById = async (req, res) => {
    const result = await Transaction.findByPk(parseInt(req.params.id));
    if (result) {
        return res.json(result);
    }
    return res.status(404).json({error:'Transaction with this ID doesn\'t exist'});
} 

const createTransaction = async (req, res) => {
    const { envelopeId, paymentAmount } = req.body
    
    const envelopeExists = await Envelope.findByPk(envelopeId);
    if (envelopeExists) {
        const result = await Transaction.create({
            envelopeId: envelopeId,
            paymentAmount: paymentAmount
        });
        return res.status(201).json({ "Transaction successfully added": result.dataValues });
    }
    res.status(404).json({error:'There isn\'t envelope for this transaction'});
} 

const updateTransaction = async (req, res) => {
    const id = parseInt(req.params.id);
    const { envelopeId, paymentAmount } = req.body
    const timestamp = 'NOW()';
    
    const envelopeExists = await Envelope.findByPk(envelopeId);
    if (envelopeExists) {
        const result = await Transaction.update({
            envelopeId: envelopeId,
            date: timestamp,
            paymentAmount: paymentAmount
        }, {
            where: {id: id}
        });
        if (result[0] != 0) {
            return res.json({"Transaction was modified with ID:": `${id}`});
        }
        return res.status(404).json({"error": "Transaction with this ID doesn\'t exist"});
    }
    return res.status(404).json({error:'There isn\'t envelope for this transaction'});
} 

const deleteTransaction = async (req, res) => {
    const id = parseInt(req.params.id)
    const result = await Transaction.destroy({
        where: {id: id}
    })
    if (result) {
        return res.sendStatus(204);
    }
    return res.status(404).json({error:"Ttansaction with this ID doesn\'t exist"});
} 

//export methods
module.exports = {
    getTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction
};
