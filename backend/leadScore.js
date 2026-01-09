// leadScore.js
export const scoreLead = (carrier) => {
  const units = parseInt(carrier.powerUnits || "0");

  if (units <= 5) return "HOT";
  if (units <= 20) return "WARM";
  return "COLD";
};
