function calculateTax(
  legalForm: string,
  taxRate: number,
  mounth: number,
  totalIncomes: number,
  totalOneExpenses: number,
  totalExpenses: number,
) {
  const result = [];

  if (legalForm == 'llc') {
    result.push({ name: 'Налог(20%)', amount: totalIncomes * 0.2 });
  } else if (legalForm == 'individual-1') {
    result.push({ name: 'Налог(6%)', amount: totalIncomes * 0.06 });
    if (mounth % 3 == 0) {
      result.push({ name: 'Пенсионный налог', amount: 12375 });
    }
  } else if (legalForm == 'individual-2') {
    result.push({
      name: 'Налог(15%)',
      amount: (totalIncomes - totalOneExpenses - totalExpenses) * 0.15,
    });
    if (mounth % 3 == 0) {
      result.push({ name: 'Пенсионный налог', amount: 12375 });
    }
  } else if (legalForm == 'self-employed') {
    result.push({ name: 'Налог(4%)', amount: totalIncomes * 0.04 });
  } else if (legalForm == 'personal') {
    result.push({
      name: `Пользовательский процент(${taxRate}%)`,
      amount: totalIncomes * (taxRate / 100),
    });
  }

  return result;
}

export function calculate(plane: any) {
  const result: Array<any> = [];

  let mounth = 1;

  let budget = plane.budget;
  let incomes: Array<any> = plane.incomes.map((income: any) => {
    if (income.type !== 'client') return income;

    return { ...income, cost: income.cost * income.clients };
  });
  let oneExpenses: Array<any> = plane.expenses.filter(
    (i: any) => i.type == 'one-time',
  );

  let employees: Array<any> = plane.employees.map((item: any) => ({
    ...item,
    persent: item.salary * 0.43,
  }));

  while (mounth < 25) {
    if (mounth % 4 == 0) {
      incomes = incomes.map((item) => ({
        ...item,
        cost: item.cost + item.cost * 0.05,
      }));
    }

    const expenses: Array<any> = plane.expenses
      .filter((i: any) => i.type == 'constant')
      .filter((i: any) => {
        if (mounth % i.period == 0) {
          return i;
        }
      });

    const totalIncomes = incomes.reduce((sum, income) => sum + income.cost, 0);
    const beforeIncomesBudget = budget + totalIncomes;

    const totalOneExpenses = oneExpenses.reduce(
      (sum, income) => sum + income.cost,
      0,
    );
    const beforeOneExpensesBudget = beforeIncomesBudget - totalOneExpenses;

    const totalExpenses = expenses.reduce(
      (sum, income) => sum + income.cost,
      0,
    );

    let creditPayment = 0;

    if (plane.budgetType == 'credit' && mounth < plane.loanTerm + 1) {
      const s = plane.interestRate / 100 / 12;
      const c =
        (s * (1 + s) ** plane.loanTerm) / ((1 + s) ** plane.loanTerm - 1);

      creditPayment = plane.loanAmount * c;
    } else {
      creditPayment = 0;
    }

    const unforeseenExpenses = totalIncomes * 0.05;

    const intermediate = totalExpenses + unforeseenExpenses + creditPayment;

    const beforeExpensesBudget =
      beforeOneExpensesBudget -
      unforeseenExpenses -
      totalExpenses -
      creditPayment;

    const totalEmployees = employees.reduce((sum, employee) => {
      if (employee.type == 'officially') {
        return sum + employee.salary + employee.persent;
      } else {
        return sum + employee.salary;
      }
    }, 0);

    const beforeEmployeesBudget = beforeExpensesBudget - totalEmployees;

    const taxes = calculateTax(
      plane.legalForm,
      plane.taxRate,
      mounth,
      totalIncomes,
      totalOneExpenses,
      totalExpenses,
    );

    const totalTaxes = taxes.reduce((sum, tax) => sum + tax.amount, 0);

    const beforeTaxesBudget = beforeEmployeesBudget - totalTaxes;

    const resultExpenses =
      totalOneExpenses +
      totalExpenses +
      unforeseenExpenses +
      totalEmployees +
      creditPayment +
      totalTaxes;

    const cleanProfit = totalIncomes - resultExpenses;

    const profitability = (cleanProfit * 100) / totalIncomes;

    let loanBalance = 0;

    if (plane.budgetType == 'credit' && mounth < plane.loanTerm + 1) {
      loanBalance = plane.loanTerm * creditPayment - mounth * creditPayment;
    }

    let profitMounth;

    if (cleanProfit >= plane.profit) {
      profitMounth = true;
    }

    result.push({
      budget,
      incomes,
      totalIncomes,
      beforeIncomesBudget,
      oneExpenses,
      totalOneExpenses,
      beforeOneExpensesBudget,
      expenses,
      totalExpenses,
      creditPayment,
      unforeseenExpenses,
      intermediate,
      beforeExpensesBudget,
      employees,
      totalEmployees,
      beforeEmployeesBudget,
      taxes,
      totalTaxes,
      beforeTaxesBudget,

      resultExpenses,
      cleanProfit,
      profitability,
      loanBalance,

      profitMounth,
    });

    budget = beforeTaxesBudget;

    oneExpenses = [];

    mounth++;
  }

  return result;
}
