const Kasub = require("../../models/kasub.model");

async function getAll(req, res) {
  try {
    const kasubs = await Kasub.find();
    return res.json(kasubs);
  } catch (error) {
    res.status(501).json({
      message: "Unknown error occurs",
      error
    });
  }
}

async function create(req, res) {
  try {
    const kasub = await Kasub.create(req.body);
    res.status(201).json(kasub);
  } catch (error) {
    res.status(501).json({
      message: "Unkown error occurs",
      error
    });
  }
}

async function findOneById(req, res) {
  try {
    const kasub = await Kasub.findById(req.params.id);
    if (!kasub) {
      return res
        .status(404)
        .json({ message: `Kasub with ${req.params.id} was not found` });
    }

    return res.json(kasub);
  } catch (error) {
    res.status(501).json({
      message: "Unkown error occurs",
      error
    });
  }
}

async function findByIdAndEdit(req, res) {
  try {
    await Kasub.findByIdAndUpdate(req.params.id, req.body);

    res.json({ message: `Kasub with id ${req.params.id} has been updated` });
  } catch (error) {
    res.status(501).json({
      message: "Unkown error occurs",
      error
    });
  }
}

async function deleteOneById(req, res) {
  try {
    const kasub = await Kasub.findByIdAndRemove(req.params.id);
    res.json(kasub);
  } catch (error) {
    res.status(501).json({
      message: "Unkown error occurs",
      error
    });
  }
}

module.exports = {
  getAll,
  create,
  findByIdAndEdit,
  findOneById,
  deleteOneById
};
