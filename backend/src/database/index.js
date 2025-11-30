const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('backlog_games', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, 
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o MySQL foi estabelecida com sucesso.');
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error);
    }
}

testConnection();

module.exports = sequelize;