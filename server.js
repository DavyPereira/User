import express from 'express'
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.post('/usuarios', async (req, res) => {
    try {
        const usuario = await prisma.user.create({
            data: {
                email: req.body.email,
                name: req.body.name,
                age: req.body.age
            }
        })
        res.status(201).json(usuario)
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'Email já cadastrado' })
        }
        res.status(500).json({ error: 'Erro ao criar usuário' })
    }
})

app.get('/usuarios', async (req, res) => {
    const usuarios = await prisma.user.findMany()
    res.status(200).json(usuarios)
})

app.listen(3000, () => {
    console.log("servidor inciado")
})