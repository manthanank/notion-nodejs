const getNotes = require('../services/notion');

exports.getNotes = async (req, res) => {
  const notes = await getNotes();
  res.json(notes);
};