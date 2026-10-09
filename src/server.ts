import "dotenv/config";
import express from "express";
import { paymentMiddleware, x402ResourceServer } from "@x402/express";
import { ExactEvmScheme } from "@x402/evm/exact/server";
import { HTTPFacilitatorClient } from "@x402/core/server";

const app = express();
const network = "eip155:84532";
const payTo = process.env.EVM_ADDRESS;
const facilitatorUrl = process.env.FACILITATOR_URL ?? "https://x402.org/facilitator";
const port = Number(process.env.PORT ?? 4021);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be an integer between 1 and 65535");
}
if (payTo && (!/^0x[0-9a-fA-F]{40}$/.test(payTo) || /^0x0{40}$/.test(payTo))) {
  throw new Error("EVM_ADDRESS must be a non-zero EVM receiving address");
}

app.disable("x-powered-by");
app.get("/health", (_req, res) => {
  res.json({ service: "chinaparts-ai", network, paymentConfigured: Boolean(payTo) });
});

if (payTo) {
  const resourceServer = new x402ResourceServer(new HTTPFacilitatorClient({ url: facilitatorUrl }))
    .register(network, new ExactEvmScheme());
  app.use(paymentMiddleware({
    "GET /v1/parts/demo": {
      accepts: { scheme: "exact", price: "$0.001", network, payTo: payTo as `0x${string}` },
      description: "ChinaParts AI synthetic parts lookup demo",
      mimeType: "application/json",
    },
  }, resourceServer));
  app.get("/v1/parts/demo", (_req, res) => {
    res.setHeader("Cache-Control", "no-store");
    res.json({ demo: true, part: { id: "DEMO-001", description: "Synthetic component record" } });
  });
} else {
  app.get("/v1/parts/demo", (_req, res) => {
    res.status(503).json({ error: "Payment setup incomplete: configure EVM_ADDRESS" });
  });
}

app.listen(port, "127.0.0.1", () => {
  console.log(`ChinaParts AI: http://127.0.0.1:${port}`);
});
