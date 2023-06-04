export function fmtMSS(s: number) {
  var date = new Date(0);
  date.setSeconds(Math.floor(s));
  return date.toISOString().substring(14, 19);
}
