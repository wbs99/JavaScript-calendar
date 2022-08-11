// 初始化，获取当前年月
const time = getSelector("#time");
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 2;
time.textContent = `${year}年${month}月`;

// 求出当月的第一天是星期几

// 当月第一天
const firstDayOfCurrentMonth = new Date(year, month - 1, 1);
// 当月第一天星期几
const weekdayOfFirstDayOfCurrentMonth = firstDayOfCurrentMonth.getDay();
// 当月最后一天
const lastDayOfCurrentMonth = new Date(year, month, 1);
// 当月最后一天是星期几
const weekdayOfLastDayOfCurrentMonth = new Date(
  new Date(year, month, 1) - 86400 * 1000
);

const days = getSelector("#days");

for (let i = 1; i < weekdayOfFirstDayOfCurrentMonth; i++) {
  const li = document.createElement("li");
  const d = new Date(firstDayOfCurrentMonth - 86400 * 1000 * i);
  li.textContent = d.getDate();
  days.prepend(li);
}

for (let i = 1; i <= weekdayOfLastDayOfCurrentMonth.getDate(); i++) {
  const li = document.createElement("li");
  li.textContent = i;
  days.append(li);
}

// 帮助函数
function getSelector(selector) {
  return document.querySelector(selector);
}
function getAllSelector(selector) {
  return document.querySelectorAll(selector);
}
