// cache.js
import NodeCache from "node-cache";

export const cache = new NodeCache({
  stdTTL: 86400, // 24 hours
  checkperiod: 120
});
