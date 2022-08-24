// 思路
// 1. 获取当月有多少天
// 2. 计算月初需要铺垫多少天
// 3. 计算月末需要铺垫多少天
let currentTime = new Date()

render(currentTime)

getSelector("#prevMonth").onclick = () => {
  const firstDayOfMonth = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    1
  )
  render(new Date(firstDayOfMonth - 86400 * 1000))
}
getSelector("#nextMonth").onclick = () => {
  const firstDayOfNextMonth = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth() + 1,
    1
  )
  render(new Date(firstDayOfNextMonth))
}
getSelector("#today").onclick = () => {
  render(new Date())
}

function render(time) {
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  initTime()
  generateTime()

  currentTime = time

  function initTime() {
    const time = getSelector("#time")
    time.textContent = `${year}年${month}月`
  }
  function generateTime() {
    // 当月第一天
    const firstDayOfCurrentMonth = new Date(year, month - 1, 1)
    // 当月第一天星期几
    const weekdayOfFirstDayOfCurrentMonth = firstDayOfCurrentMonth.getDay()
    // 下个月的第一天
    const firstDayOfNextMonth = new Date(year, month, 1)
    // 当月最后一天
    const lastDayOfCurrentMonth = new Date(firstDayOfNextMonth - 86400 * 1000)

    const days = getSelector("#days")
    days.innerHTML = ""
    const now = new Date()
    let n = 0
    let selectedLi
    // 这个月有多少天就先创建多少个 li
    for (let i = 1; i <= lastDayOfCurrentMonth.getDate(); i++) {
      const li = document.createElement("li")
      li.textContent = i
      if (
        i === now.getDate() &&
        month === now.getMonth() + 1 &&
        year === now.getFullYear()
      ) {
        li.classList.add("calendar-days-today")
      }
      li.onclick = () => {
        if (selectedLi) {
          selectedLi.classList.remove("calendar-days-selected")
        }
        li.classList.add("calendar-days-selected")
        selectedLi = li
      }
      days.append(li)
      n += 1
    }

    // 月初星期三，就得铺垫两天。月初星期四，就得铺垫三天，以此类推
    for (let i = 1; i < weekdayOfFirstDayOfCurrentMonth; i++) {
      const li = document.createElement("li")
      const d = new Date(firstDayOfCurrentMonth - 86400 * 1000 * i)
      li.textContent = d.getDate()
      li.classList.add("calendar-days-disabled")
      days.prepend(li)
      n += 1
    }

    // 铺垫末尾的日期
    let delta = 1
    for (let j = 0; j < 42 - n; j++) {
      const li = document.createElement("li")
      const d = new Date(lastDayOfCurrentMonth - 0 + 86400 * 1000 * delta)
      li.textContent = d.getDate()
      li.classList.add("calendar-days-disabled")
      days.append(li)
      delta++
    }
  }
}

// 帮助函数
function getSelector(selector) {
  return document.querySelector(selector)
}
function getAllSelector(selector) {
  return document.querySelectorAll(selector)
}
