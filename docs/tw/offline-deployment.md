# 离线部署

通过自托管 draw.io 来替代 `embed.diagrams.net`，从而离线部署 Next AI Draw.io。

**注意：** `NEXT_PUBLIC_DRAWIO_BASE_URL` 是一个**构建时**變數。修改它需要重新构建 Docker 镜像。

## Docker Compose 設定

1. 複製倉庫并在 `.env` 檔案中定义 API 密钥。
2. 建立 `docker-compose.yml`：

```yaml
services:
  drawio:
    image: jgraph/drawio:latest
    ports: ["8080:8080"]
  next-ai-draw-io:
    build:
      context: .
      args:
        - NEXT_PUBLIC_DRAWIO_BASE_URL=http://localhost:8080
    ports: ["3000:3000"]
    env_file: .env
    depends_on: [drawio]
```

3. 執行 `docker compose up -d` 并開啟 `http://localhost:3000`。

## 配置与重要警告

**`NEXT_PUBLIC_DRAWIO_BASE_URL` 必须是使用者浏览器可存取的地址。**

| 场景 | URL 值 |
|----------|-----------|
| 本地主机 (Localhost) | `http://localhost:8080` |
| 远程/伺服器 | `http://YOUR_SERVER_IP:8080` |

**切勿使用** Docker 内部别名（如 `http://drawio:8080`），因为浏览器无法解析它们。
