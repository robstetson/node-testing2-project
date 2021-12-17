const request = require('supertest')
const server = require('../server')
const database = require('../../data/dbConfig')

beforeAll(async () => {
  await database.migrate.rollback()
  await database.migrate.latest()
})
beforeEach(async () => {
  await database.seed.run()
})
afterAll(async () => {
  await database.destroy()
})

it('you are on the right track with the env!', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})
describe('hobbits router', () => {
  describe('[GET] /hobbits', () => {
    let res
    beforeEach(async () => {
      res = await request(server).get('/hobbits')
    })
    it('has 200 error', async () => {
      expect(res.status).toBe(200)
    })
    it('all hobbit', async () => {
      expect(res.body).toHaveLength(4)
    })
  })
  describe('[POST] /hobbits', () => {
    let res
    beforeEach(async () => {
      res = await request(server)
        .post('/hobbits/')
        .send({ name: 'gabe' })
    })
    it('has 210 created', async () => {
      expect(res.status).toBe(201)
    })
    it('new hobbit', async () => {
      expect(res.body).toMatchObject({ id: 5, name: 'gabe' })
    })
    it('(snapshot)', () => {
      expect(res.body).toMatchSnapshot()
    })
  })
})
