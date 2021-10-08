const bcrypt = require('bcrypt')
const { User } = require('./../models')

//users - methods for authentication
const getUserById = async (userId) => {
    const result = await User.findAll({
        where: { id: userId }
    })
    return result[0].dataValues;
}

const getUserByEmail = async (userEmail) => {
    const result = await User.findAll({
        where: { email: userEmail } 
    })
    if (result.length === 0) {
        return null;
    }
    return result[0].dataValues;
}

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const exists = await getUserByEmail(email);
    if (!exists) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        });
        //return res.status(201).json({"User added with email": `${result.dataValues.email}`});
        res.redirect('/login');
    } else {
        res.redirect('/register');
        //return res.status(404).json({error:'User with this email already exists'});
    }
}

module.exports = {
    getUserById,
    getUserByEmail,
    createUser
};