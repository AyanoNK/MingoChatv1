const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encryptPassword = async (password) => {//receives password
  //creates hash
  const salt = await bcrypt.genSalt(10);
  //encrypts with hash
  const hash = await bcrypt.hash(password, salt);
  //returned hash password
  return hash;
};

//compare password to login
helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (e) {
    console.log(e)
  }
};

module.exports = helpers;
