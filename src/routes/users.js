module.exports = () => {
  const findAll = (req, res) => {
    const users = [{
      name: 'John Doe',
      mail: 'johndoe@mail.com',
    }];
    res.status(200).json(users);
  };
  
  const create = (req, res) => {
    res.status(200).send(req.body);
  };

  return { findAll, create };
};
