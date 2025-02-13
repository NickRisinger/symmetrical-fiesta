
// Расходы на сотрудников
interface Employee {
    position: 'barista' | 'supervisor' | 'hr' | 'accountant';
    salary: number;
    tax: number;
}

const TAX_RATE = 43;
const BASE_SALARIES = {
    barista: 50000,
    supervisor: 80000,
    hr: 80000,
    accountant: 30000,
};

const SALARY_RANGES = [
    { max: 200, salary: BASE_SALARIES.barista },
    { max: 310, salary: 70000 },
    { max: 410, salary: 85000 },
    { max: 510, salary: 100000 },
    { max: 800, salary: 130000 },
    { max: Infinity, salary: 150000 },
];

const EMPLOYEE_COUNT_RANGES = [
    { max: 150, count: 2 },
    { max: 300, count: 4 },
    { max: 800, count: 6 },
    { max: Infinity, count: 8 },
];

const ADDITIONAL_POSITIONS = [
    {
        condition: (visitors: number) => visitors > 450,
        position: 'supervisor' as const,
        salary: BASE_SALARIES.supervisor
    },
    {
        condition: (visitors: number) => visitors > 800,
        position: 'hr' as const,
        salary: BASE_SALARIES.hr
    },
    {
        condition: (visitors: number) => visitors > 0,
        position: 'accountant' as const,
        salary: BASE_SALARIES.accountant
    }
];

const MARKETING_BUDGET_RANGES = [
    { max: 100, budget: 100000 },   // До 100 посетителей
    { max: 150, budget: 150000 },   // До 150 посетителей
    { max: 200, budget: 200000 },   // 150-200 посетителей
    { max: 300, budget: 250000 },   // 200-300 посетителей
    { max: 400, budget: 300000 },   // 300-400 посетителей
    { max: 500, budget: 350000 },   // 400-500 посетителей
    { max: 800, budget: 400000 },   // 500-800 посетителей
    { max: Infinity, budget: 500000 }, // 800+ посетителей
];

const calculateEmployee = (countVisitors: number): Employee[] => {
    const result: Employee[] = [];

    // Определяем базовую зарплату бариста
    const baseSalary = SALARY_RANGES.find(({ max }) => countVisitors < max)?.salary || BASE_SALARIES.barista;

    // Определяем количество бариста
    const employeeCount = EMPLOYEE_COUNT_RANGES.find(({ max }) => countVisitors < max)?.count || 2;

    // Добавляем бариста
    result.push(...Array(employeeCount).fill({
        position: 'barista',
        salary: baseSalary,
        tax: TAX_RATE,
    }));

    // Добавляем дополнительные позиции
    ADDITIONAL_POSITIONS.forEach(({ condition, position, salary }) => {
        if (condition(countVisitors)) {
            result.push({
                position,
                salary,
                tax: TAX_RATE,
            });
        }
    });

    return result;
};

// Функция расчета маркетингового бюджета
const calculateMarketingBudget = (countVisitors: number): number => {
    const range = MARKETING_BUDGET_RANGES.find(({ max }) => countVisitors < max);
    return range?.budget ?? 500000; // Fallback на максимальное значение
};

const calculateCountVisitors = () => { }


export function calculate(plane: any) {
    const result: Array<any> = [];

    let mounth = 1;

    while (mounth < 25) { }
}