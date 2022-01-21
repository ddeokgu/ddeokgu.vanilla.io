
const dDay = document.querySelector("h2");
function nowDate() {
  const date = new Date();

  const second = date.getSeconds();
  const minute = date.getMinutes();
  const hour = date.getTime();
  const day = date.getDate();
  const month = date.getMonth();


  const dDayInfo =
    day + "d" + " " + hour + "h" + " " + minute + "m" + " " + second + "s";

  now.innerText = dDayInfo;
}

function init() {
  nowDate();
  setInterval(nowDate, 1000);
}
init();
