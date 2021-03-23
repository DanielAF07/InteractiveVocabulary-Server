const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const app = express()
connectDB()


app.use(cors())

app.use(express.json({ extended: true }))

const port = process.env.PORT || 4000

// RUTAS
app.use('/api/words', require('./routes/words'))
app.use('/api/auth', require('./routes/auth'))

// PAGINA PRINCIPAL
app.get('/', (req, res) => {
    res.send('Hola mundo')
})

// Run App
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor funcionando en puerto ${port}`);
})