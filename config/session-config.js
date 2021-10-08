//session env config
const dotenv = require('dotenv')
dotenv.config();

module.exports = {
    port: process.env.PORT,
    sessLifetime: process.env.SESS_LIFETIME,
    sessName: process.env.SESS_NAME,
    sessSecret: process.env.SESS_SECRET,
  };