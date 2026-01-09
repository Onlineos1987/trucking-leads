// limiter.js
import Bottleneck from "bottleneck";

export const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 3000 // 1 request every 3 seconds
});
