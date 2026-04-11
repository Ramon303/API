// import { user } from "pg/lib/defaults";
// import { db_connect } from "../utils/db.js"

const MOCK_USERS = [
    {id: 1, email: "admin@test.com", password: "123", name: "Administrador"},
    {id: 2, email: "david@tec.mx", password: "password123", name: "David Rangel"}
]
export const login = async (req, res) => {

    const { email, password } = req.body

    console.log("Intento de login con: ", email);

    try {
        
        const userFound = MOCK_USERS.find(user => user.email === email && user.password === password);

        if(!userFound){
            return res.status(401).json({
                message: "Usuario o contraseña incorrectos (simulado)"
            });
        }

        res.json({
            message: "Login exitoso",
            user: {
                id: userFound.id,
                email: userFound.email,
                name: userFound.name
            }
        });

    } catch (error) {

        res.status(500).json({
            message: "Error en el servidor"
        })
    }
}