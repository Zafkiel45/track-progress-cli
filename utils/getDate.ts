const date = new Date();

export function getDate() {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export function getDatetime() {
  const fullDate = getDate();
  const hours    = formatDateAndHours(date.getHours());
  const minutes  = formatDateAndHours(date.getMinutes());
  const seconds  = formatDateAndHours(date.getSeconds());
  return `${fullDate} ${hours}:${minutes}:${seconds}`;
};

function formatDateAndHours(time: string | number) {
  return String(time).padStart(2, '0');
};