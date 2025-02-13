export const createMonthsArray = (startDate: Date, numberOfMonths: number) => {
    const months = [];
    const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

    for (let i = 0; i < numberOfMonths; i++) {
        const currentDate = new Date(startDate);
        currentDate.setMonth(startDate.getMonth() + i);

        const monthIndex = currentDate.getMonth(); // Индекс месяца (0-11)
        const year = currentDate.getFullYear();
        const monthName = monthNames[monthIndex];

        months.push({
            name: monthName,
            indexInYear: monthIndex + 1, // Индекс в году (1-12)
            year: year
        });
    }

    return months;
}
