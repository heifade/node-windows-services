const { resolve } = require("path");

module.exports = {
  getConfig: argv => {
    for (let i = 0; i < argv.length; i++) {
      if (argv[i] === "-c") {
        return argv[i + 1];
      }
    }
    return resolve(process.cwd(), "./config.json");
  }
};
