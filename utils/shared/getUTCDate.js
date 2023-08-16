// Format JS date to "YYYY-MM-DD HH:MM:SS" time in UTC
export const getUTCDate = (date) => {
  if (!date || !(date instanceof Date)) {
    return "";
  }

  return date.toISOString().slice(0, 19).replace("T", " ");
};

export const isIsoDate = (str) => {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  const d = new Date(str); 
  return d instanceof Date && !isNaN(d.getTime()) && d.toISOString()===str; // valid date 
}