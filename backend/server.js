// server.js
import express from "express";
import cors from "cors";
import { fetchCarrierByMC } from "./scraper.js";
import { bulkScrapeMC } from "./bulkScraper.js";
import { Parser } from "json2csv";

const app = express();
app.use(cors());

app.get("/api/carrier", async (req, res) => {
  const { mc } = req.query;
  if (!mc) return res.status(400).json({ error: "MC required" });

  const data = await fetchCarrierByMC(mc);
  res.json(data);
});

app.get("/api/bulk", async (req, res) => {
  const { startMC, endMC } = req.query;
  const data = await bulkScrapeMC({
    startMC: Number(startMC),
    endMC: Number(endMC)
  });
  res.json(data);
});

app.get("/api/export/csv", async (req, res) => {
  const { startMC, endMC } = req.query;
  const data = await bulkScrapeMC({
    startMC: Number(startMC),
    endMC: Number(endMC)
  });

  const parser = new Parser();
  const csv = parser.parse(data);

  res.header("Content-Type", "text/csv");
  res.attachment("trucking-leads.csv");
  res.send(csv);
});

app.listen(4000, () => console.log("Backend running on :4000"));
