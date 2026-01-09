// bulkScraper.js
import { fetchCarrierByMC } from "./scraper.js";

export const bulkScrapeMC = async ({ startMC, endMC }) => {
  const leads = [];

  for (let mc = startMC; mc <= endMC; mc++) {
    try {
      const carrier = await fetchCarrierByMC(mc);
      if (carrier) leads.push(carrier);
    } catch {
      continue;
    }
  }

  return leads;
};
