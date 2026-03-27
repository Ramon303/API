import { db_connect } from "../utils/db.js"

export const login = async (req, res) => {

    const { email, password } = req.body

    try {

        const sql = await db_connect()

        const result = await sql.query(
            "SELECT * FROM users WHERE email=$1 AND password=$2",
            [email, password]
        )

        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "Usuario o contraseña incorrectos"
            })
        }

        res.json({
            message: "Login exitoso",
            user: result.rows[0]
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: "Error en el servidor"
        })
    }
}