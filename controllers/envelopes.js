const { Envelope, Transaction } = require('./../models')
//envelope queries
const getEnvelopes = async (req, res) => {
    const result = await Envelope.findAll({
        order: ['id']
    });
    return res.json(result);
    
} 

const getEnvelopeById = async (req, res) => {
    const result = await Envelope.findByPk(parseInt(req.params.id));
    if (result) {
        return res.json(result);
    }
    return res.status(404).json({error:'Envelope with this ID doesn\'t exist'});
} 

const getEnvelopeTransactions = async (req, res) => {
    const id = parseInt(req.params.id)
    const exists = await Envelope.findByPk(id);
    if (exists) {
        const result = await Transaction.findAll({
            where: {envelopeId: id},
            order: [['date', 'DESC']]
        })
        return res.json(result);
    } 
    return res.status(404).json({error:'Envelope with this ID doesn\'t exist'})
}

const createEnvelope = async (req, res) => {
        const { envelopeName, monthLimit, currentMoney, isEmpty, iconUrl, partOfBalance } = req.body
        const result = await Envelope.create({
            envelopeName: envelopeName,
            monthLimit: monthLimit,
            currentMoney: currentMoney,
            isEmpty: isEmpty,
            iconUrl: iconUrl,
            partOfBalance: partOfBalance
        });
        return res.status(201).json({ "Envelope successfully added": result.dataValues });
} 

const updateEnvelope = async (req, res) => {
        const id = parseInt(req.params.id);
        const { envelopeName, monthLimit, currentMoney, isEmpty, iconUrl, partOfBalance } = req.body
        const result = await Envelope.update({
            envelopeName: envelopeName,
            monthLimit: monthLimit,
            currentMoney: currentMoney,
            isEmpty: isEmpty,
            iconUrl: iconUrl,
            partOfBalance: partOfBalance
        }, {
            where: {id: id}
        });
        if (result[0] != 0) {
            return res.json({"Envelope modified with ID": `${id}`});
        }
        return res.status(404).json({"error": "Envelope with this ID doesn\'t exist"});
} 
    
const deleteEnvelope = async (req, res) => {
    const id = parseInt(req.params.id)
    const result = await Envelope.destroy({
        where: {id: id}
    })
    if (result) {
        return res.sendStatus(204);
    }
    return res.status(404).json({error:"Envelope with this ID doesn\'t exist"});
}

module.exports = {
    getEnvelopes,
    getEnvelopeById,
    getEnvelopeTransactions,
    createEnvelope,
    updateEnvelope,
    deleteEnvelope
};