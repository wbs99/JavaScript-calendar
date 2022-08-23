// 思路
// 1. 获取当月有多少天
// 2. 计算月初需要铺垫多少天
// 3. 计算月末需要铺垫多少天
const time = getSelector("#time");
const days = getSelector("#days");
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
time.textContent = `${year}年${month}月`;

// 当月第一天
const firstDayOfCurrentMonth = new Date(year, month - 1, 1);
// 当月第一天星期几
const weekdayOfFirstDayOfCurrentMonth = firstDayOfCurrentMonth.getDay();
// 下个月的第一天
const firstDayOfNextMonth = new Date(year, month, 1);
// 当月最后一天
const lastDayOfCurrentMonth = new Date(firstDayOfNextMonth - 86400 * 1000);

// 这个月有多少天就先创建多少个 li
for (let i = 1; i <= lastDayOfCurrentMonth.getDate(); i++) {
  const li = document.createElement("li");
  li.textContent = i;
  days.append(li);
}

// 月初星期三，就得铺垫两天。月初星期四，就得铺垫三天，一次类推
for (let i = 1; i < weekdayOfFirstDayOfCurrentMonth; i++) {
  const li = document.createElement("li");
  const d = new Date(firstDayOfCurrentMonth - 86400 * 1000 * i);
  li.textContent = d.getDate();
  days.prepend(li);
}

// 铺垫末尾的日期
for (let i = lastDayOfCurrentMonth.getDay() + 1; i <= 7; i++) {
  const delta = i - lastDayOfCurrentMonth.getDay();
  const li = document.createElement("li");
  const d = new Date(lastDayOfCurrentMonth - 0 + 86400 * 1000 * delta);
  li.textContent = d.getDate();
  days.append(li);
}

// 帮助函数
function getSelector(selector) {
  return document.querySelector(selector);
}
function getAllSelector(selector) {
  return document.querySelectorAll(selector);
}
