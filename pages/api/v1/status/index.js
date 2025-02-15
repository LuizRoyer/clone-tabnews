import database from "/api/configurations/database.js"

export default async function status(req, res) {
    const updateAt = new Date().toISOString()

    const version = await database.query("show server_version;")
    const maxConnection = await database.query("show  max_connections;")
    const openedConnection = await database.query({
        text: "select count(*)::int from pg_stat_activity where datname = $1;",
        values: [process.env.POSTGRES_DB]
    })

    const dependencies = {
        database: {
            version: version.rows[0].server_version,
            max_connection: parseInt(maxConnection.rows[0].max_connections),
            opened_connection: openedConnection.rows[0].count
        }
    }
    res.status(200).json({
        status: 200,
        updated_at: updateAt,
        dependencies
    })
}