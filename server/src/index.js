import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { createClient } from '@supabase/supabase-js'
import authRoutes from './routes/authRoutes.js'
import serviceRoutes from './routes/serviceRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'

//testvercel
dotenv.config()

const app = express()
app.use(cors({ origin: '*', credentials: true }))
app.use(express.json())

// Conexión a Supabase
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

// Rutas
app.use('/api/auth', authRoutes)
app.use('/api/service', serviceRoutes)
app.use('/api/booking', bookingRoutes)

const PORT = process.env.PORT || 3000

// Solo correr el servidor si NO estamos en producción (o sea, local)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`)
  })
}

// Exportar app para Vercel
export default app
