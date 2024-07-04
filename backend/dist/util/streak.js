"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.streakCalculator = void 0;
const streakCalculator = (lastStepDate, currentStreak) => {
    const today = new Date();
    if (!isSameDay(today, lastStepDate)) {
        const diffTime = Math.abs(today.getTime() - lastStepDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
            // Continue the streak
            currentStreak += 1;
        }
        else if (diffDays > 1) {
            // Missed a day, reset streak
            console.log(diffDays);
            currentStreak = 1 - diffDays;
        }
    }
    return currentStreak;
};
exports.streakCalculator = streakCalculator;
function isSameDay(date1, date2) {
    return (date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate());
}
