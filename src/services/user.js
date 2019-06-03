const ValidationMessage = require('../errors/ValidationMessage');

module.exports = (app) => {
  const findAll = (filter = {}) => {
    return app.db('users').where(filter).select();
  };

  const save = async (user) => {
    if (!user.name) throw new ValidationMessage('Nome é um atributo obrigatório');
    if (!user.mail) throw new ValidationMessage('Email é um atributo obrigatório');
    if (!user.password) throw new ValidationMessage('Senha é um atributo obrigatório');

    const userDb = await findAll({ mail: user.mail });

    if (userDb && userDb.length > 0) throw new ValidationMessage('Já existe um usuário com esse email');

    return app.db('users').insert(user, '*');
  };
  return { findAll, save };
};
