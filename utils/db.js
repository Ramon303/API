import pkg from "pg"

const { Client } = pkg

export const db_connect = async () => {

    const client = new Client({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        ssl: {
            rejectUnauthorized: false
        }
    })

    await client.connect()

    return client
}