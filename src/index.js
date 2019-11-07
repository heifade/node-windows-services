const { Service } = require("node-windows");
const { resolve } = require("path");
const { readFileSync, existsSync } = require("fs");
const { getConfig } = require("./utils");

const configFile = getConfig(process.argv);

if (!existsSync(configFile)) {
  console.error(`Config file ${configFile} not exists!`);
  return;
}

let config = {};
try {
  config = JSON.parse(readFileSync(configFile));
} catch {
  console.error(`Can not read from file ${configFile}!`);
  return;
}

const { name: serviceName, description, script } = config;

let scriptFile = "";
if (script.startsWith("./") || script.startsWith("../")) {
  scriptFile = resolve(process.cwd(), script);
} else {
  scriptFile = script;
}

if (!existsSync(scriptFile)) {
  console.error(`Script file ${scriptFile} not exists!`);
  return;
}

const svc = new Service({
  name: serviceName,
  description,
  script: scriptFile,
  wait: 1, // 程序崩溃后重启时间
  grow: 0.25, // 重启等待时间成长值。
  maxRestarts: 20 // 60秒内最多重启次数
});

svc.on("install", () => {
  svc.start();
  console.log(`${serviceName} installed`);
});

svc.on("uninstall", () => {
  console.log(`${serviceName} uninstalled`);
});

svc.on("stop", () => {
  console.log(`${serviceName} stopped.`);
  console.log("Is running: ", svc.exists);
});

svc.on("start", () => {
  console.log(`${serviceName} started.`);
  console.log("Is running: ", svc.exists);
});

if (svc.exists) {
  svc.uninstall();
} else {
  svc.install();
}
