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
  "script": ""
}
```

### 指定配置文件
```
node-windows-services -c ./config.json
```