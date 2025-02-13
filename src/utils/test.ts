interface ExpenseView {
    index: number;
    name: string;
    average: number;
    price: number;
    spentPerDay: number;
    spentPerMonth: number;
}


const getIngredients = (isSummer: boolean) => ([
    {
        index: 1,
        name: "Кофе",
        quantity: 22.65,
        unit: "грамм",
        usagePercentage: isSummer ? 57 : 70,
        pricePerUnit: 1.7,
    },
    {
        index: 2,
        name: "Обычное молоко",
        quantity: 235,
        unit: "мл",
        usagePercentage: isSummer ? 48 : 80,
        pricePerUnit: 0.09,
    },
    {
        index: 3,
        name: "Альтернативное молоко",
        quantity: 240,
        unit: "мл",
        usagePercentage: isSummer ? 9 : 16,
        pricePerUnit: 0.18,
    },
    {
        index: 4,
        name: "Шоколад",
        quantity: 46,
        unit: "грамм",
        usagePercentage: isSummer ? 5 : 25,
        pricePerUnit: 0.9,
    },
    {
        index: 5,
        name: "Сливки",
        quantity: 125,
        unit: "мл",
        usagePercentage: isSummer ? 17 : 33,
        pricePerUnit: 0.225,
    },
    {
        index: 6,
        name: "Сиропы в напитках",
        quantity: 22.5,
        unit: "мл",
        usagePercentage: isSummer ? 40 : 33,
        pricePerUnit: 0.438,
    },
    {
        index: 7,
        name: "Сиропы как добавка",
        quantity: 20,
        unit: "мл",
        usagePercentage: 50,
        pricePerUnit: 0.438,
    },
    {
        index: 8,
        name: "Сухая смесь для раффов",
        quantity: 25,
        unit: "грамм",
        usagePercentage: isSummer ? 5 : 10,
        pricePerUnit: 3.2,
    },
    {
        index: 9,
        name: "Пюре",
        quantity: 60,
        unit: "грамм",
        usagePercentage: isSummer ? 42 : 14,
        pricePerUnit: 0.75,
    },
    {
        index: 10,
        name: "Тоник",
        quantity: 360,
        unit: "мл",
        usagePercentage: isSummer ? 30 : 15,
        pricePerUnit: 0.07,
    },
    {
        index: 11,
        name: "Сок",
        quantity: 360,
        unit: "мл",
        usagePercentage: isSummer ? 30 : 15,
        pricePerUnit: 0.095,
    },
    {
        index: 12,
        name: "Матча",
        quantity: 2.25,
        unit: "грамм",
        usagePercentage: isSummer ? 42 : 14,
        pricePerUnit: 10,
    },
    {
        index: 13,
        name: "Сахар",
        quantity: 10,
        unit: "грамм",
        usagePercentage: 35,
        pricePerUnit: 0.065,
    },
    {
        index: 14,
        name: "Корица",
        quantity: 0.5,
        unit: "грамм",
        usagePercentage: 35,
        pricePerUnit: 1,
    },
    {
        index: 15,
        name: "Чай",
        quantity: 1,
        unit: "пакетик",
        usagePercentage: 20,
        pricePerUnit: 3,
    }
]);

const getOther = () => ([
    {
        index: 16,
        name: "Выпечка",
        usagePercentage: 50,
        pricePerUnit: 115,
    },
    {
        index: 17,
        name: "Контейнеры и упаковка для выпечки",
        usagePercentage: 20,
        pricePerUnit: 12.2,
    },
    {
        index: 18,
        name: "Крышки",
        usagePercentage: 100,
        pricePerUnit: 2.1,
    },
    {
        index: 19,
        name: "Стаканы",
        usagePercentage: 100,
        pricePerUnit: 7,
    },
    {
        index: 20,
        name: "Наклейки на стаканы",
        usagePercentage: 100,
        pricePerUnit: 2,
    },
    {
        index: 21,
        name: "Подставки для стаканов",
        usagePercentage: 100,
        pricePerUnit: 3.8,
    },
    {
        index: 22,
        name: "Сливы для стаканов (возможно, поддоны)",
        usagePercentage: 50,
        pricePerUnit: 1.74,
    },
    {
        index: 23,
        name: "Чеки",
        usagePercentage: 100,
        pricePerUnit: 0.1,
    },
    {
        index: 24,
        name: "Расходные материалы для клиентов",
        usagePercentage: 100,
        pricePerUnit: 1,
    },
    {
        index: 25,
        name: "Расходные материалы для персонала",
        usagePercentage: 100,
        pricePerUnit: 0.9,
    },
]);

const getWater = () => ([
    {
        index: 15,
        name: "Чай",
        quantity: 1,
        unit: "пакетик",
        usagePercentage: 20,
        pricePerUnit: 3,
    },
    {
        index: 15,
        name: "Чай",
        quantity: 1,
        unit: "пакетик",
        usagePercentage: 20,
        pricePerUnit: 3,
    },
    {
        index: 15,
        name: "Чай",
        quantity: 1,
        unit: "пакетик",
        usagePercentage: 20,
        pricePerUnit: 3,
    },
    {
        index: 15,
        name: "Чай",
        quantity: 1,
        unit: "пакетик",
        usagePercentage: 20,
        pricePerUnit: 3,
    },
]);

const mandatoryExpenses = (visitors: number, isSummer: boolean) => {
    const ingredients = getIngredients(isSummer);
    const other = getOther();

    ingredients.map((ingredient) => {
        const realVisitors = visitors * ingredient.usagePercentage / 100;
        const spentPerDay = ingredient.quantity * realVisitors * 0.05;
        const spentPerDayPrice = spentPerDay * ingredient.pricePerUnit;
        const spentPerMonth = spentPerDay * 30;
        const spentPerMonthPrice = spentPerDayPrice * 30 * 0.05;

        return {
            ...ingredient,
            spentPerDay,
            spentPerDayPrice,
            spentPerMonth,
            spentPerMonthPrice,
        }
    })

    other.map((item) => {
        const realVisitors = visitors * item.usagePercentage / 100;
        const spentPerDayPrice = item.pricePerUnit * realVisitors;
        const spentPerMonthPrice = spentPerDayPrice * 30;

        return {
            ...item,
            realVisitors,
            spentPerDayPrice,
            spentPerMonthPrice,
        }
    })

}