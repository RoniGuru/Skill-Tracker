export const streakCalculator = (lastStepDate: Date, currentStreak: number) => {
  const today = new Date();

  if (!isSameDay(today, lastStepDate)) {
    const diffTime = Math.abs(today.getTime() - lastStepDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Continue the streak
      currentStreak += 1;
    } else if (diffDays > 1) {
      // Missed a day, reset streak
      console.log(diffDays);
      currentStreak = 1 - diffDays;
    }
  }
  return currentStreak;
};

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
