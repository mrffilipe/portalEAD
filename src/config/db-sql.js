const knex = require('knex').knex({
    client: 'mysql2',
    connection: {
        host: process.env.dbSQL_HOST,
        port: process.env.dbSQL_PORT,
        user: process.env.dbSQL_USER,
        password: process.env.dbSQL_PASSWORD,
        database: process.env.dbSQL_DATABASE
    }
});

const verifyKnexConnection = async () => {
    try {
        await knex.raw("SELECT 1");
        console.log("MySQL OK!");
    } catch (error) {
        console.log(error);
    }

}
verifyKnexConnection();

module.exports = knex;