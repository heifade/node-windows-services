const { resolve } = require("path");
const { existsSync, readFileSync } = require("fs");
const chalk = require("chalk");

function getUrl(p) {
  if (p.startsWith("./") || p.startsWith("../")) {
    return resolve(process.cwd(), p);
  } else {
    return p;
  }
}

module.exports = {
  getConfig: argv => {
    const configOfArgv = {};
    let configOfFile = {};
    for (let i = 0; i < argv.length; i++) {
      const p = argv[i];
      const v = argv[i + 1];
      switch (p) {
        case "-c": {
          // 如果指定了配置文件
          const file = resolve(getUrl(v));
          if (!existsSync(file)) {
            const msg = `Config file ${file} not exists`;
            console.error(chalk.red(msg));
            throw new Error(msg);
          }
          try {
            configOfFile = JSON.parse(readFileSync(file, { encoding: "utf8" }));
          } catch {
            const msg = `Can not read from file ${file}`;
            console.error(chalk.red(msg));
            throw new Error(msg);
          }
          break;
        }
        case "-n": {
          // 服务名称
          configOfArgv.name = v;
          break;
        }
        case "-d": {
          // 服务描述
          configOfArgv.description = v;
          break;
        }
        case "-s": {
          // 执行脚本
          configOfArgv.script = v;
          break;
        }
      }
    }

    const config = { ...configOfFile, ...configOfArgv };
    config.script = getUrl(config.script);

    if (config.script.trim() === "") {
      const msg = `Script can not be null`;
      console.error(chalk.red(msg));
      throw new Error(msg);
    }

    if (!existsSync(config.script)) {
      const msg = `Script file ${config.script} not exists`;
      console.error(chalk.red(msg));
      throw new Error(msg);
    }
    return config;
  }
};
