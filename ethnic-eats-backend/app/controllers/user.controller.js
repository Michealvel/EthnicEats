const User = require('../models/user.model')
const fs = require('fs')
const path = require('path')
const appDir = path.dirname(require.main.filename)

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.uploadImage = async (req, res) => {
  const { file, userId } = req;
  try {
    const user = await User.findById(userId);
    user.image = file.path;
    user.save();
    return res.status(200).json({ "success": true, "message": "photo updated successfuly ", "path": user.image })
  }
  catch (e) {
    return res.status(200).json({ "success": false, "message": e.message })
  }
};

exports.editStreamTitle = async function (req, res) {
  const { body } = req;
  const { name } = body;
  try {
    if (!name) throw new Error("please provide a name to the stream");
    const streamJson = await fs.readFileSync(path.join(appDir, 'uploads', "stream-info.json"), { encoding: 'utf8' });
    const streamObject = JSON.parse(streamJson);
    streamObject.name = name;
    fs.writeFileSync(path.join(appDir, 'uploads', "stream-info.json"), JSON.stringify(streamObject), { encoding: 'utf8' })
    return res.status(200).json({ "success": true, "message": `name updated successfully to ${name}` });
  }
  catch (e) {
    return res.status(200).json({ "success": false, "message": e.message })
  }
};

exports.getStreamTitle = async function (req, res) {
  try {
    const streamJson = await fs.readFileSync(path.join(appDir, 'uploads', "stream-info.json"), { encoding: 'utf8' });
    const streamObject = JSON.parse(streamJson);
    return res.status(200).json({ "success": true, name: streamObject.name });
  }
  catch (e) {
    return res.status(400).json({ "success": false, "message": e.mesaage })
  }
};
