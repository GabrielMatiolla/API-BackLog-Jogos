const { DataTypes } = require('sequelize');
const database = require('../database/index');

const Game = database.define('Game', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagem: {
        type: DataTypes.STRING(500), 
        allowNull: true, 
    },
    plataforma: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Backlog'
    },
    prioridade: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nota: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
});

Game.associate = (models) => {
    Game.belongsTo(models.User, { foreignKey: 'user_id', as: 'dono' });
};

module.exports = Game;