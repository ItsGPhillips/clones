import isValid from 'date-fns/isValid';

export function fmtMSS(s: number) {
  var date = new Date(0);
  if (!isValid(date)) {
    return '--:--';
  }
  date.setSeconds(Math.floor(s));
  return date.toISOString().substring(14, 19);
}
