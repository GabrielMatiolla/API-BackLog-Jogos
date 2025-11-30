const Game = require('../models/Game');

module.exports = {
    async store(req, res) {
        try {
            const { titulo, plataforma, status, prioridade, imagem } = req.body;

            const game = await Game.create({
                titulo,
                plataforma,
                status,
                prioridade,
                imagem, 
                user_id: req.userId 
            });

            return res.status(201).json(game);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao cadastrar jogo.' });
        }
    },

    async index(req, res) {
        try {
            const { status } = req.query;
            const whereClause = { user_id: req.userId };

            if (status) {
                whereClause.status = status;
            }

            const games = await Game.findAll({ where: whereClause });
            return res.json(games);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao buscar jogos.' });
        }
    },

    async show(req, res) {
        try {
            const { id } = req.params;
            const game = await Game.findOne({
                where: { id: id, user_id: req.userId }
            });

            if (!game) return res.status(404).json({ error: 'Jogo não encontrado.' });

            return res.json(game);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar detalhes.' });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { status, nota, plataforma, prioridade, imagem } = req.body;

            const game = await Game.findOne({
                where: { id: id, user_id: req.userId }
            });

            if (!game) return res.status(404).json({ error: 'Jogo não encontrado.' });

            await game.update({ status, nota, plataforma, prioridade, imagem });

            return res.json(game);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar jogo.' });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const game = await Game.findOne({
                where: { id: id, user_id: req.userId }
            });

            if (!game) return res.status(404).json({ error: 'Jogo não encontrado.' });

            await game.destroy();
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao remover jogo.' });
        }
    }
};