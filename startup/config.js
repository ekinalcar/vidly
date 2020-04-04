const config = require("config");

module.exports = function() {
  if (!config.get("jwtPrivateKey")) {
    console.log("FATAL ERROR JWT not provided");
    process.exit(1);
  }
};
