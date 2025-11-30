const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const authConfig = require('../config/auth');

module.exports = {
    async store(req, res) {
        const { email, senha } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado.' });
        }

        if (!(await bcrypt.compare(senha, user.senha))) {
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        const { id, nome } = user;

        return res.json({
            user: {
                id,
                nome,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
};