export default function getNumber(value, fallback) {
  if (typeof (value) === 'string') {
    value = Number(value);
  }
  if (typeof (value) !== 'number' || value < 0 || isNaN(value)) {
    return fallback;
  }
  return value;
}
