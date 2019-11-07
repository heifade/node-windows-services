const { Service } = require("node-windows");
const { resolve } = require("path");
const { readFileSync, existsSync } = require("fs");

const configFile = resolve(__dirname, "./config.json");

if (!existsSync(configFile)) {
  console.error(`File ${configFile} not exists!`);
  return;
}

const { name: serviceName, description, script } = readFileSync(configFile);
const svc = new Service({
  name: serviceName,
  description,
  script: resolve(__dirname, script),
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
