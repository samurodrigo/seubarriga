const request = require('supertest');

const app = require('../../src/app');

test('Deve listar todos os usuarios', () => {
  return request(app).get('/users')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Deve inserir um usuário com sucesso', () => {
  const mail = `${Date.now()}@mail.com`;
  return request(app)
    .post('/users')
    .send({ name: 'Samuel Ferreira', mail, password: '123456' })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Samuel Ferreira');
    });
});

test('Não deve inserir usuário sem nome', () => {
  return request(app)
    .post('/users')
    .send({ mail: 'teste@mail.com', password: '123456' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Nome é um atributo obrigatório');
    });
});

test('Não deve inserir usuário sem email', async () => {
  const result = await request(app).post('/users')
    .send({ name: 'Samuel Ferreira', password: '123456' });

  expect(result.status).toBe(400);
  expect(result.body.error).toBe('Email é um atributo obrigatório');
});

test('Não deve inserir um usuário sem senha', (done) => {
  request(app).post('/users')
    .send({ name: 'Samuel Ferreira', mail: 'teste@mail.com' })
    .then((result) => {
      expect(result.status).toBe(400);
      expect(result.body.error).toBe('Senha é um atributo obrigatório');
      done();
    })
    .catch(error => done.fail(error));
});
