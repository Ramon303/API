import dotenv from "dotenv"
dotenv.config()

import express from "express"
import morgan from "morgan"
import cors from "cors"
import { db_connect } from "./utils/db.js"
import routes from "./routes/index.routes.js"


console.log("HOST:", process.env.DB_HOST)
console.log("PORT:", process.env.DB_PORT)

const sql = await db_connect()

const result = await sql.query("SELECT 1")
console.log(result.rows[0])

const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

app.use(routes)

app.listen(8000, () => {
    console.log("http://localhost:8000/")
})