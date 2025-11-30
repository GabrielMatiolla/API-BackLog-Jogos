const app = require('./src/app');
const sequelize = require('./src/database/index'); 

const PORT = 3000;

async function iniciarServidor() {
    try {
        await sequelize.sync({ alter: true }); 
        console.log('Banco de dados sincronizado com sucesso!');

        app.listen(PORT, () => {
            console.log(`Servidor a correr no endereço: http://localhost:${PORT}`);
            console.log('Padrão de Projeto aplicado: MVC');
        });
    } catch (error) {
        console.error('Erro ao iniciar o servidor:', error);
    }
}

iniciarServidor();