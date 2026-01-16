# 使用 Docker 執行

如果您只是想在本地執行，最好的方式是使用 Docker。

首先，如果您尚未安裝 Docker，请先安裝：[获取 Docker](https://docs.docker.com/get-docker/)

然后執行：

```bash
docker run -d -p 3000:3000 \
  -e AI_PROVIDER=openai \
  -e AI_MODEL=gpt-4o \
  -e OPENAI_API_KEY=your_api_key \
  ghcr.io/dayuanjiang/next-ai-draw-io:latest
```

或者使用環境變數檔案：

```bash
cp env.example .env
# 编辑 .env 檔案并填入您的配置
docker run -d -p 3000:3000 --env-file .env ghcr.io/dayuanjiang/next-ai-draw-io:latest
```

在浏览器中開啟 [http://localhost:3000](http://localhost:3000)。

请将環境變數取代为您首选的 AI 提供商配置。查看 [AI 提供商](./ai-providers.md) 了解可用選項。

> **离线部署：** 如果无法存取 `embed.diagrams.net`，请参阅 [离线部署](./offline-deployment.md) 了解配置選項。
