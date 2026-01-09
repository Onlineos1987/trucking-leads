// scraper.js
import axios from "axios";
import cheerio from "cheerio";
import { limiter } from "./limiter.js";
import { cache } from "./cache.js";
import { scoreLead } from "./leadScore.js";

const BASE_URL = "https://safer.fmcsa.dot.gov/query.asp";

export const fetchCarrierByMC = async (mc) =>
  limiter.schedule(async () => {
    if (cache.has(mc)) return cache.get(mc);

    const { data } = await axios.get(BASE_URL, {
      params: {
        searchtype: "ANY",
        query_type: "queryCarrierSnapshot",
        query_param: "MC_MX",
        query_string: mc
      }
    });

    const $ = cheerio.load(data);

    const get = (label) =>
      $(`td:contains("${label}")`).next("td").text().trim();

    const carrier = {
      mcNumber: mc,
      legalName: get("Legal Name"),
      dbaName: get("DBA Name"),
      usdot: get("USDOT Number"),
      address: get("Physical Address"),
      phone: get("Phone"),
      operatingStatus: get("Operating Status"),
      powerUnits: get("Power Units"),
      drivers: get("Drivers"),
      safetyRating: get("Safety Rating"),
      leadScore: null
    };

    if (carrier.operatingStatus !== "ACTIVE") return null;

    carrier.leadScore = scoreLead(carrier);
    cache.set(mc, carrier);
    return carrier;
  });
