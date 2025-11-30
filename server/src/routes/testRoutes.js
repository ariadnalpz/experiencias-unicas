/**
 * @jest-environment node
 */
// server/routes/testRoutes.js
import express from 'express'
const router = express.Router()

let services = [
  { id: 1, name: 'Tour de senderismo', price: 30 },
  { id: 2, name: 'Clase de cocina', price: 20 }
]

// GET /api/__test/services
router.get('/services', (req, res) => {
  res.json(services)
})

// POST /api/__test/services
router.post('/services', (req, res) => {
  const { name, price } = req.body
  if (!name || price == null) return res.status(400).json({ error: 'name and price required' })
  const id = services.length ? services[services.length - 1].id + 1 : 1
  const s = { id, name, price }
  services.push(s)
  res.status(201).json(s)
})

// POST reset (para tests)
router.post('/services/__reset', (req, res) => {
  services = [
    { id: 1, name: 'Tour de senderismo', price: 30 },
    { id: 2, name: 'Clase de cocina', price: 20 }
  ]
  res.json({ ok: true })
})

export default router
