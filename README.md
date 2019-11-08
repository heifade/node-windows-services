# 用于方便地部署 windows services

## 安装
```
npm i node-windows-services
```

## 命令
```
node-windows-services
```

## 配置文件
### 默认到工作目录下找 config.json 文件
```json
{
  "name": "server name",
  "description": "description",
  "script": "./index.js"
}
```

### 指定配置文件
```
node-windows-services -c ./config.json
```

### 指定参数
```
node-windows-services -c 配置文件 -n 服务名称 -d 服务描述 -s 执行脚本
```

### 注意项
```
-c 指定配置文件(可以为空)。可以 './' 或 '../' 开头为工作目录的相对路径，也可以是绝对路径
-n, -d, -s，会覆盖 配置文件 里的内容
-s 可以 './' 或 '../' 开头为工作目录的相对路径，也可以是绝对路径
```

