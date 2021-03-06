const request = require('supertest');

const app = require('../../src/app');

const MAIN_ROUTE = '/accounts';

let user;

beforeAll(async () => {
  const res = await app.services.user.save({ name: 'User Account', mail: `${Date.now()}@mail.com}`, password: '123456' });
  user = { ...res[0] };
});

test('Deve inserir uma conta com sucesso', () => {
  return request(app).post(MAIN_ROUTE)
    .send({ name: 'Acc #1', user_id: user.id })
    .then((result) => {
      expect(result.status).toBe(201);
      expect(result.body.name).toBe('Acc #1');
    });
});

test('Não deve inserir uma conta sem o nome', () => {
  return request(app).post(MAIN_ROUTE)
    .send({ user_id: user.id })
    .then((result) => {
      expect(result.status).toBe(400);
      expect(result.body.error).toBe('O Nome é um atributo obrigatório');
    });
});

test.skip('Não deve inserir uma conta de nome duplicado para o mesmo usuário', () => { });

test('Deve listar todas as contas', () => {
  return app.db('accounts').insert({ name: 'Account list', user_id: user.id })
    .then(() => request(app).get(MAIN_ROUTE))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test.skip('Deve listar apenas as contas do usuário', () => { });

test('Deve retornar uma conta por Id', () => {
  return app.db('accounts').insert({ name: 'Account by ID', user_id: user.id }, ['id'])
    .then(account => request(app).get(`${MAIN_ROUTE}/${account[0].id}`))
    .then((result) => {
      expect(result.status).toBe(200);
      expect(result.body.name).toBe('Account by ID');
      expect(result.body.user_id).toBe(user.id);
    });
});

test.skip('Não deve retornar uma conta de outro usuário', () => { });

test('Deve atualizar uma conta', () => {
  return app.db('accounts')
    .insert({ name: 'Account by ID', user_id: user.id }, ['id'])
    .then((account) => {
      return request(app)
        .put(`${MAIN_ROUTE}/${account[0].id}`)
        .send({ name: 'Account updated' });
    })
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Account updated');
    });
});

test.skip('Não deve atualizar uma conta de outro usuário', () => { });

test('Deve remover uma conta', () => {
  return app.db('accounts')
    .insert({ name: 'Account by ID', user_id: user.id }, ['id'])
    .then((account) => {
      return request(app)
        .delete(`${MAIN_ROUTE}/${account[0].id}`);
    })
    .then((res) => {
      expect(res.status).toBe(204);
    });
});

test.skip('Não deve remover uma conta de outro usuário', () => { });
