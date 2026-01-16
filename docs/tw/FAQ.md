# 常見問題解答 (FAQ)

---

## 1. 无法匯出 PDF

**問題**: Web 版點擊匯出 PDF 后跳转到 `convert.diagrams.net/node/export` 然后无响应

**原因**: 嵌入式 Draw.io 不支援直接 PDF 匯出，依赖外部转换服务，在 iframe 中无法正常工作

**解決方案**: 先匯出为图片（PNG），再打印转成 PDF

**相关 Issue**: #539, #125

---

## 2. 无法存取 embed.diagrams.net（离线/内网部署）

**問題**: 内网環境提示"找不到 embed.diagrams.net 的伺服器 IP 地址"

**关键点**: `NEXT_PUBLIC_*` 環境變數是**构建时**變數，会被打包到 JS 程式碼中，**執行时設定无效**！

**解決方案**: 必须在构建时通过 `args` 传入：

```yaml
# docker-compose.yml
services:
  drawio:
    image: jgraph/drawio:latest
    ports: ["8080:8080"]
  next-ai-draw-io:
    build:
      context: .
      args:
        - NEXT_PUBLIC_DRAWIO_BASE_URL=http://你的伺服器IP:8080/
    ports: ["3000:3000"]
    env_file: .env
```

**内网使用者**: 在外网修改 Dockerfile 并构建镜像，再传到内网使用

**相关 Issue**: #295, #317

---

## 3. 自建模型只思考不画图

**問題**: 本地部署的模型（如 Qwen、LiteLLM）只輸出思考过程，不產生图表

**可能原因**:
1. **模型太小** - 小模型难以正确遵循 tool calling 指令，建议使用 32B+ 參數的模型
2. **未开启 tool calling** - 模型服务需要配置 tool use 功能

**解決方案**: 开启 tool calling，例如 vLLM：
```bash
python -m vllm.entrypoints.openai.api_server \
    --model Qwen/Qwen3-32B \
    --enable-auto-tool-choice \
    --tool-call-parser hermes
```

**相关 Issue**: #269, #75

---

## 4. 上傳图片后提示"未提供图片"

**問題**: 上傳图片后，系統显示"未提供图片"錯誤

**可能原因**:
1. 模型不支援视觉功能（如 Kimi K2、DeepSeek、Qwen 文本模型）

**解決方案**:
- 使用支援视觉的模型：GPT-5.2、Claude 4.5 Sonnet、Gemini 3 Pro
- 模型名带 `vision` 或 `vl` 的支援图片
- 更新到最新版本（v0.4.9+）

**相关 Issue**: #324, #421, #469
