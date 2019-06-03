module.exports = (app) => {
  const findAll = (req, res) => {
    app.services.user.findAll()
      .then(result => res.status(200).json(result));
  };

  const create = async (req, res) => {
    try {
      const result = await app.services.user.save(req.body);
      res.status(201).send(result[0]);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  return { findAll, create };
};
