const getDB = require('../../db/db');

const postEntry = async (req, res) => {
  const connect = await getDB();
  const { title, shortDescription, largeDescription } = req.body;


}