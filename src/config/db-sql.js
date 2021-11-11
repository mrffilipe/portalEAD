const knex = require('knex').knex({
    client: 'mysql2',
    connection: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
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