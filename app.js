import express, { json } from 'express' // require -> commonJS 
import { moviesRouter } from './routes/movies-routes.js'
import { corsMiddleware } from './middlewares/cors.js'

//EN EL FUTURO EL IMPORT DEL JSON SERA ASÍ:
//import movies from './movies.json' with {type: module}
/*
Como leer un json en ESModules
import fs from = 'node:fs'
const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))
*/

// Como leer un json en ESModules recomendado por ahora: 

const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

// Todas las rutas que estan en moviesRouter
app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`server listening http://localhost:${PORT}`)
})

/*
app.get('/', (req, res) => {
    // leer el query param de format
    const format = req.query.format
    if(format === 'html'){
        res.send('<h1>Hola mundo</h1>')
    }
    res.json({ message: 'Hola mundo' })
})
SOLUCION AL PROBLEMA DE CORS SIN INSTALAR NADA:

app.get:
//SOLUCION AL PROBLEMA DE CORS SIN INSTALAR NADA:
const origin = req.header('origin')
// El navegador nunca envía el header de origin cuando la petición es del mismo ORIGIN
// http://localhost:1234 -> http://localhost:1234 
if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
}
app.delete:
const origin = req.header('origin') 
if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
}
app.options:
app.options('/movies/:id', (req, res) => {
    const origin = req.header('origin')
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin)
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    }
    res.send(200)
})

*/