/**
 * @jest-environment node
 */
import request from "supertest";
import app from "../src/index.js";


describe('Integration tests (Supertest)', () => {
  beforeEach(async () => {
    // resetear store in-memory del test router
    await request(app).post('/api/__test/services/__reset').send()
  })

  test('GET /api/health -> returns ok', async () => {
    const res = await request(app).get('/api/health')
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('status', 'ok')
  })

  test('GET /api/__test/services -> array with initial services', async () => {
    const res = await request(app).get('/api/__test/services')
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThanOrEqual(2)
    expect(res.body[0]).toHaveProperty('name')
  })

  test('POST /api/__test/services -> create and then verify via GET', async () => {
    const newService = { name: 'Paseo en bicicleta', price: 15 }
    const resPost = await request(app).post('/api/__test/services').send(newService)
    expect(resPost.statusCode).toBe(201)
    expect(resPost.body).toMatchObject({ name: newService.name, price: newService.price })
    const resGet = await request(app).get('/api/__test/services')
    expect(resGet.body.find(s => s.name === newService.name)).toBeTruthy()
  })
})
