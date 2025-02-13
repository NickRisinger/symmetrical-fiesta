// Функция расчета аннуитетного платежа
const calculateLoanPayment = (
    amount: number,
    months: number,
    annualRate: number
): number => {
    const monthlyRate = annualRate / 100 / 12;
    const coefficient = (monthlyRate * Math.pow(1 + monthlyRate, months))
        / (Math.pow(1 + monthlyRate, months) - 1);

    return Math.round(amount * coefficient);
};