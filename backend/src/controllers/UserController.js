const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
    async store(req, res) {
        try {
            const { nome, email, senha } = req.body;

            const userExists = await User.findOne({ where: { email } });
            if (userExists) {
                return res.status(400).json({ error: 'Usuário já cadastrado com este e-mail.' });
            }

            const passwordHash = await bcrypt.hash(senha, 8);

            const user = await User.create({
                nome,
                email,
                senha: passwordHash, 
            });

            return res.status(201).json({
                id: user.id,
                nome: user.nome,
                email: user.email,
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    }
};