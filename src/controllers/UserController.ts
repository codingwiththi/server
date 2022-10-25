// create a user controller class with prisma
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import prisma from "../utils/prisma";

export class UserController {
    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        const passwordValid = await bcrypt.compare(password, user.password);

        if (!passwordValid) {
            return res.status(401).json({ message: "Senha Inválida" });
        }

        res.json(user);
    }

    async register(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await prisma.user.create({
            data: {
                email,
                password: await bcrypt.hash(password, 10),
            },
        });

        res.json(user);
    }

    async read(req: Request, res: Response) {
        const users = await prisma.user.findMany();
        res.json(users);
    }

    //read a single user
    async readOne(req: Request, res: Response) {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        res.json(user);
    }
}
//
// export default new UserController();
//
// import UserController from "../controllers/UserController";
//
// router.post("/users", UserController.create);
//
// export default router;
//
// import router from "./routes";
//
// app.use(router);
//
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
//
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
//
// export default prisma;
//
// import express from "express";
//
// const app = express();
// const port = 3000;
//
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
//
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
//
