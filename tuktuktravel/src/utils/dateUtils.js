export function formatFullDate(date) {
  const month = parseInt(date.getMonth(), 0) + 1;
  return `${date.getUTCDate() < 10
    ? '0' : ''}${date.getUTCDate()}/${month < 10 
      ? '0' : ''}${month}/${date.getUTCFullYear()}`; 
}

const dateParts = isoFormatDateString.split("-");
const jsDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0, 2), dateParts[2].substr(3, 2), dateParts[2].substr(6, 2), dateParts[2].substr(9, 2));


// Split timestamp into [ Y, M, D, h, m, s ]
var t = "2010-06-09 13:12:01".split(/[- :]/);

// Apply each element to the Date function
var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));