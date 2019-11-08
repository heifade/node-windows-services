const { Service } = require("node-windows");
const { getConfig } = require("./utils");

const { name, description, script } = getConfig(process.argv);

const svc = new Service({
  name,
  description,
  script,
  wait: 1, // 程序崩溃后重启时间
  grow: 0.25, // 重启等待时间成长值。
  maxRestarts: 20 // 60秒内最多重启次数
});

svc.on("install", () => {
  svc.start();
  console.log(`${name} installed`);
});

svc.on("uninstall", () => {
  console.log(`${name} uninstalled`);
});

svc.on("stop", () => {
  console.log(`${name} stopped.`);
  console.log("Is running: ", svc.exists);
});

svc.on("start", () => {
  console.log(`${name} started.`);
  console.log("Is running: ", svc.exists);
});

if (svc.exists) {
  svc.uninstall();
} else {
  svc.install();
}
