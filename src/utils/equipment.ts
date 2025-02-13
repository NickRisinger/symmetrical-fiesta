interface EquipmentItem {
    name: string;
    cost: number;
    count: number;
    power: number;
    hoursPerDay: number; // Добавим время работы
}

const ELECTRICITY_TARIFF = 7; // руб/кВт·ч
const DAYS_IN_MONTH = 30;
const ADDITIONAL_LOAD = 2; // кВт для "Других" устройств
const ADDITIONAL_HOURS = 5; // Часы работы "Других"

const EQUIPMENT_WORK_HOURS = {
    coffeeMachine: 13,
    grinder: 6,
    tamperAuto: 6,
    iceGenerator: 13,
    refrigerator: 24,
    showcaseCold: 18,
    showcaseRegular: 13,
};

const EQUIPMENT_CONFIG = {
    coffeeMachine: (visitors: number) => {
        if (visitors >= 800) {
            return {
                cost: 2_000_000,
                count: 1,
                power: 5,
                hoursPerDay: 13
            };
        }
        if (visitors >= 300) {
            return {
                cost: 500_000,
                count: 1,
                power: 4,
                hoursPerDay: 13
            };
        }
        return {
            cost: 250_000,
            count: 1,
            power: 3,
            hoursPerDay: 13
        };
    },

    iceGenerators: (visitors: number, isSummer: boolean) => {
        let config;
        if (visitors >= 300) {
            config = {
                cost: 80_000,
                power: 0.5,
                hoursPerDay: 13
            };
        } else {
            config = {
                cost: 50_000,
                power: 0.3,
                hoursPerDay: 13
            };
        }

        const count = visitors >= 300
            ? (isSummer ? 2.5 : 1)
            : 1;

        return {
            ...config,
            count: Math.ceil(count)
        };
    },

    grinder: () => ({
        cost: 60_000,
        count: 1,
        power: 0.4,
        hoursPerDay: 6
    }),

    tamper: (visitors: number) => ({
        automatic: {
            cost: visitors >= 200 ? 50_000 : 0,
            count: visitors >= 200 ? 1 : 0,
            power: visitors >= 200 ? 0.5 : 0,
            hoursPerDay: visitors >= 200 ? 6 : 0
        },
        manual: {
            cost: 2_000,
            count: 1,
            power: 0,
            hoursPerDay: 0
        }
    }),

    refrigerator: (visitors: number) => ({
        cost: 40_000,
        count: visitors >= 500 ? 2 : 1,
        power: 0.5,
        hoursPerDay: 24
    }),

    tablets: (visitors: number) => ({
        cost: 20_000,
        count: visitors >= 200 ? 2 : 1,
        power: 0.5,
        hoursPerDay: 12 // Среднее время работы
    }),

    showcases: (visitors: number) => {
        const count = visitors >= 600 ? 2 : 1;
        return {
            regular: {
                cost: 50_000,
                count,
                power: 0.2,
                hoursPerDay: 13
            },
            refrigerated: {
                cost: 70_000,
                count,
                power: 0.6,
                hoursPerDay: 18
            }
        };
    },

    waterFiltration: (visitors: number) => ({
        cost: visitors >= 800 ? 100_000 : 70_000,
        count: 1,
        power: 0,
        hoursPerDay: 24
    }),

    mandatory: {
        cashRegister: {
            cost: 4_500,
            count: 1,
            power: 0,
            hoursPerDay: 10
        },
        microwave: {
            cost: 5_000,
            count: 1,
            power: 0.8,
            hoursPerDay: 3
        }
    },

    others: () => ({
        cost: 0, // Уже учтены в других категориях
        count: 1,
        power: 2,
        hoursPerDay: 5
    })
};

const calculateEquipment = (
    visitors: number,
    isSummer: boolean = false
): { totalCost: number; totalPower: number; items: EquipmentItem[] } => {
    const items: EquipmentItem[] = [];

    // Кофемашина
    items.push({
        name: 'Кофемашина',
        ...EQUIPMENT_CONFIG.coffeeMachine(visitors)
    });

    // Ледогенераторы
    const iceGen = EQUIPMENT_CONFIG.iceGenerators(visitors, isSummer);
    items.push({
        name: 'Ледогенератор',
        ...iceGen
    });

    // Кофемолка
    items.push({
        name: 'Кофемолка',
        ...EQUIPMENT_CONFIG.grinder()
    });

    // Темперы
    const tampers = EQUIPMENT_CONFIG.tamper(visitors);
    items.push(
        { name: 'Темпер автоматический', ...tampers.automatic },
        { name: 'Темпер простой', ...tampers.manual }
    );

    // Холодильник
    items.push({
        name: 'Холодильник',
        ...EQUIPMENT_CONFIG.refrigerator(visitors)
    });

    // Планшеты
    items.push({
        name: 'Планшеты',
        ...EQUIPMENT_CONFIG.tablets(visitors)
    });

    // Витрины
    const showcases = EQUIPMENT_CONFIG.showcases(visitors);
    items.push(
        { name: 'Витрина обычная', ...showcases.regular },
        { name: 'Витрина холодильная', ...showcases.refrigerated }
    );

    // Фильтрация воды
    items.push({
        name: 'Фильтрация воды',
        ...EQUIPMENT_CONFIG.waterFiltration(visitors)
    });

    // Обязательное оборудование
    items.push(
        {
            name: 'Кассовый аппарат',
            ...EQUIPMENT_CONFIG.mandatory.cashRegister
        },
        {
            name: 'Микроволновка',
            ...EQUIPMENT_CONFIG.mandatory.microwave
        }
    );

    // Другие устройства
    items.push({
        name: 'Прочее оборудование',
        ...EQUIPMENT_CONFIG.others()
    });

    // Фильтрация нулевых позиций
    const filteredItems = items.filter(item => item.cost > 0);

    // Расчет итогов
    const totalCost = filteredItems.reduce(
        (sum, item) => sum + (item.cost * item.count), 0
    );

    const totalPower = filteredItems.reduce(
        (sum, item) => sum + (item.power * item.count * item.hoursPerDay), 0
    );

    return {
        totalCost,
        totalPower,
        items: filteredItems
    };
};

const calculateElectricityCost = (items: EquipmentItem[]): number => {
    // Расчет основного потребления
    const baseConsumption = items.reduce((total, item) => {
        return total + (item.power * item.count * item.hoursPerDay);
    }, 0);

    // Добавляем "Другие" устройства
    const additionalConsumption = ADDITIONAL_LOAD * ADDITIONAL_HOURS;

    // Суммарное дневное потребление
    const dailyConsumption = baseConsumption + additionalConsumption;

    // Расчет с учетом тарифа и надбавки
    const monthlyCost = dailyConsumption * ELECTRICITY_TARIFF * DAYS_IN_MONTH;
    const totalCost = monthlyCost * 1.05; // +5%

    return Math.round(totalCost / 1000) * 1000; // Округление до тысяч
};