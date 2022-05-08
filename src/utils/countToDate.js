const countDownToDate = (endDate) => {
  const end = new Date(endDate);

  const seconds = 1000,
    minutes = seconds * 60,
    hours = minutes * 60,
    day = hours * 24;

  const timerDisplay = () => {
    const now = new Date();
    const isExpired = end - now;

    const dayCount = Math.floor(isExpired / day),
      hourCount = Math.floor((isExpired % day) / hours),
      minuteCount = Math.floor((isExpired % hours) / minutes),
      secondCount = Math.floor((isExpired % minutes) / seconds);

    if (isExpired < 0) {
      clearInterval(timer);
    }
    
    return `<p>${dayCount}d : ${hourCount}h : ${minuteCount}m : ${secondCount}s</p>`;
  };

  const timer = setInterval(() => {
    timerDisplay();
  }, 1000);
};

export default countDownToDate;