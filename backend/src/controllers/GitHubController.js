const axios = require('axios');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
require('dotenv').config(); 

module.exports = {
    async redirectToGitHub(req, res) {
        const githubUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user:email`;
        res.redirect(githubUrl);
    },

    async callback(req, res) {
        const { code } = req.query;

        try {
            const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', null, {
                params: {
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code,
                },
                headers: { Accept: 'application/json' },
            });

            const accessToken = tokenResponse.data.access_token;

            const userResponse = await axios.get('https://api.github.com/user', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            
            const emailResponse = await axios.get('https://api.github.com/user/emails', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            
            const primaryEmail = emailResponse.data.find(e => e.primary && e.verified).email;
            const { name, login } = userResponse.data;

            let user = await User.findOne({ where: { email: primaryEmail } });

            if (!user) {
                const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
                
                user = await User.create({
                    nome: name || login, 
                    email: primaryEmail,
                    senha: randomPassword, 
                });
            }

            const token = jwt.sign({ id: user.id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            });

            const userData = JSON.stringify({ id: user.id, nome: user.nome, email: user.email });
            
            res.redirect(`http://127.0.0.1:5500/frontend/dashboard.html?token=${token}&user=${encodeURIComponent(userData)}`);

        } catch (error) {
            console.error('Erro no login GitHub:', error);
            res.redirect('http://127.0.0.1:5500/frontend/index.html?error=github_login_failed');
        }
    }
};