// middleware.ts
import { proxy } from "./proxy"

// ⚠️ 強制指定 Edge Runtime 以解決 Cloudflare 部署報錯
export const runtime = "edge"

export default proxy

// 匯出原本 proxy.ts 裡的 config 設定
export { config } from "./proxy"
