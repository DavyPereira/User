import express from 'express'
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL
})

const app = express()
app.use(express.json())

const user = []
app.post('/usuarios', async (req, res) => {
    
  await prisma.user.create({
    data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age
    }
   })

    res.send("ok, aqui deu certoooo")
})

app.get('/usuarios', (req, res) => {
    res.status(200).json(user)
})

app.listen(3000, () => {
    console.log("servidor inciado")
})