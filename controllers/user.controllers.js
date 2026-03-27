import { db_connect } from "../utils/db.js"

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
    try {
        const sql = await db_connect()
        const result = await sql.query("SELECT * FROM users")
        res.json(result.rows)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios" })
    }
}

// Obtener un usuario por ID
export const getUser = async (req, res) => {
    const { id } = req.params
    try {
        const sql = await db_connect()
        const result = await sql.query("SELECT * FROM users WHERE id=$1", [id])
        if (result.rows.length === 0) return res.status(404).json({ message: "Usuario no encontrado" })
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuario" })
    }
}

// Crear un usuario
export const postUser = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const sql = await db_connect()
        const result = await sql.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
            [username, email, password]
        )
        res.status(201).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: "Error al crear usuario" })
    }
}

// Actualizar un usuario
export const putUser = async (req, res) => {
    const { id } = req.params
    const { username, email, password } = req.body
    try {
        const sql = await db_connect()
        const result = await sql.query(
            "UPDATE users SET username=$1, email=$2, password=$3 WHERE id=$4 RETURNING *",
            [username, email, password, id]
        )
        if (result.rows.length === 0) return res.status(404).json({ message: "Usuario no encontrado" })
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar usuario" })
    }
}

// Eliminar un usuario
export const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        const sql = await db_connect()
        const result = await sql.query("DELETE FROM users WHERE id=$1 RETURNING *", [id])
        if (result.rows.length === 0) return res.status(404).json({ message: "Usuario no encontrado" })
        res.json({ message: "Usuario eliminado con éxito" })
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar usuario" })
    }
}