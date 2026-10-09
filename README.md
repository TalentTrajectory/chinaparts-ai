# ChinaParts AI

AgentForge 的工业零部件 API 起步项目，使用个人开发者身份参与 x402 生态。

当前仅包含合成数据示例，不含供应商数据、AI 模型或生产服务。计划仓库：`TalentTrajectory/chinaparts-ai`。开源许可证待维护者确认。

## 本地开发

需要 Node.js 22+。

```sh
npm ci
cp .env.example .env
npm run check
npm run dev
```

`GET /health` 返回服务状态。未设置 `EVM_ADDRESS` 时，`GET /v1/parts/demo` 返回 503，不提供收费资源。

在 `.env` 填入你自己的 Base Sepolia 收款地址后，示例端点使用官方 x402 v2 中间件，以测试 USDC 收取 `$0.001`。无付款请求预期返回 402；有效付款的验证和结算由 facilitator 与 SDK 处理。服务器只需要公开收款地址，不需要私钥。

## 测试网

| 设置 | 值 |
| --- | --- |
| 网络 | Base Sepolia |
| Chain ID | 84532 |
| x402 网络标识 | `eip155:84532` |
| RPC | `https://sepolia.base.org` |
| Facilitator | `https://x402.org/facilitator` |

网络和 facilitator 来自[官方 Express 示例](https://github.com/x402-foundation/x402/tree/main/examples/typescript/servers/express)及 [Base 文档](https://docs.base.org/base-chain/quickstart/connecting-to-base)。facilitator 支持情况须在联调时确认。

钱包创建、网络添加、测试 ETH/USDC 领取及首次签名尚未完成。不要把助记词或私钥放进本仓库。仅进行测试网联调后再讨论生产支付。

## 开源贡献

官方仓库：[x402-foundation/x402](https://github.com/x402-foundation/x402)。先阅读 [CONTRIBUTING.md](https://github.com/x402-foundation/x402/blob/main/CONTRIBUTING.md)，从文档或可复现的问题入手。

上游当前要求签名提交、人工审查 AI 生成代码，并披露显著 AI 使用。本地尚未配置开发者提交签名。未确认存在针对 x402 的 EasyCLA/ICLA 要求；如 PR 检查提出要求，由贡献者本人审核和签署。
