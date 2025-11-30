// server/index.js
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { createClient } from '@supabase/supabase-js'
import authRoutes from './routes/authRoutes.js'
import serviceRoutes from './routes/serviceRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'

// testRoutes será opcional y solo se importará si estamos en test env
import testRoutes from './routes/testRoutes.js' // <-- archivo que crearemos

dotenv.config()

const app = express()
app.use(cors({ origin: '*', credentials: true }))
app.use(express.json())

// Conexión a Supabase (se usa normalmente en los controllers)
export const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_KEY || ''
)

// Rutas públicas mínimas
app.get('/api/health', (req, res) => {
  return res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' })
})

// Rutas principales
app.use('/api/auth', authRoutes)
app.use('/api/service', serviceRoutes)
app.use('/api/booking', bookingRoutes)

// Montar rutas de pruebas solo si estamos en entorno de test
if (process.env.NODE_ENV === 'test') {
  app.use('/api/__test', testRoutes)
}

const PORT = process.env.PORT || 3000

// Solo correr el servidor si NO estamos en producción y si no estamos en test
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://0.0.0.0:${PORT}`)
})
}

// Exportar app para Vercel y para Supertest en tests
export default app
