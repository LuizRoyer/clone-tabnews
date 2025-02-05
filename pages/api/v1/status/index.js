import database from "../../../../api/configurations/database.js"

export default async function status(req, res) {
    const result = await database.query("select 2+2*2 as sum;")
    console.log(result.rows)
    res.status(200).json({ "status": 200, "message": "" })
}