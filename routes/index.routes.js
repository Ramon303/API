import { Router } from "express"
import { home, post, polo, pong, abc, marco, ping } from "../controllers/index.controllers.js"
import loginRoutes from "./login.routes.js"
import usersRoutes from "./users.routes.js"

const router = Router()

router.use(loginRoutes)
router.use(usersRoutes)

router.get("/", home)
router.get("/marco", marco)
router.get("/ping", ping)

router.get("/post", post)
router.get("/polo", polo)
router.get("/pong", pong)
router.get("/abc", abc)

export default router