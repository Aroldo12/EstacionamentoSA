import express from 'express'
import 'dotenv/config'
import { database } from './database/index.js'
import cors from 'cors' 
import { rotas } from './rotas/rotas.js'

const app = express()
app.use(cors()) 
app.use(express.json())
// app.use(router)
app.use("/api", rotas)

try {
    await database.authenticate()
    await database.sync({ alter: true })
    console.log('Banco conectado e sincronizado')
} catch (e) {
    console.error('Erro na conexão com o banco', e)
}

app.listen(3000, () => console.log('API rodando na porta 3000'))
                    