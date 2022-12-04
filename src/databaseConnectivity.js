import knex from 'knex';

const database = knex({
    client: 'sqlite3',
    connection: {
        filename: './tripsDatabase.sqlite3',
    },
    useNullAsDefault: true,
});

export default database;