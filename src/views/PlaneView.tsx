import { Flex, NumberFormatter, Table, Tabs, Text } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useStore } from '../store/planes';
import { calculate } from '../utils/calculate';

export default function PlaneView() {
  let { id } = useParams();
  const { getPlane } = useStore();
  const plane = getPlane(id as string);

  const result = calculate(plane);

  return (
    <Flex
      component="main"
      style={{ overflow: 'hidden' }}
      justify="center"
      align="center"
    >
      <Tabs defaultValue="1">
        <Tabs.List>
          {result.map((item, index) => (
            <Tabs.Tab
              className={item.profitMounth && 'finalMounts'}
              key={`${index} месяц`}
              value={String(index + 1)}
            >
              <Text>{index + 1} месяц</Text>
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {result.map((item, index) => (
          <Tabs.Panel value={String(index + 1)}>
            <Table highlightOnHover withTableBorder withColumnBorders>
              <Table.Tbody>
                {index == 0 && (
                  <Table.Tr>
                    <Table.Td>
                      <Text fw={700}>Бюджет на проект</Text>
                    </Table.Td>
                    <Table.Td>
                      <NumberFormatter
                        thousandSeparator=" "
                        value={item.budget}
                        suffix=" ₽"
                        decimalScale={2}
                      />
                    </Table.Td>
                  </Table.Tr>
                )}

                <Table.Tr h={30}>
                  <Table.Td></Table.Td>
                  <Table.Td></Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Td>
                    <Text fw={700}>Доходы</Text>
                  </Table.Td>
                  <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td></Table.Td>
                  <Table.Td></Table.Td>
                </Table.Tr>

                {item.incomes.map((income: any) => (
                  <>
                    <Table.Tr>
                      <Table.Td>{income.name}</Table.Td>
                      <Table.Td>
                        <NumberFormatter
                          thousandSeparator=" "
                          value={income.cost}
                          suffix=" ₽"
                          decimalScale={2}
                        />
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr h={20}>
                      <Table.Td></Table.Td>
                      <Table.Td></Table.Td>
                    </Table.Tr>
                  </>
                ))}

                <Table.Tr>
                  <Table.Td>Общая выручка</Table.Td>
                  <Table.Td>
                    <NumberFormatter
                      thousandSeparator=" "
                      value={item.totalIncomes}
                      suffix=" ₽"
                      decimalScale={2}
                    />
                  </Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Td></Table.Td>
                  <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Общий бюджет</Table.Td>
                  <Table.Td>
                    <NumberFormatter
                      thousandSeparator=" "
                      value={item.beforeIncomesBudget}
                      suffix=" ₽"
                      decimalScale={2}
                    />
                  </Table.Td>
                </Table.Tr>

                {index == 0 && (
                  <>
                    <Table.Tr h={60}>
                      <Table.Td></Table.Td>
                      <Table.Td></Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>
                        <Text fw={700}>Единоразовые расходы</Text>
                      </Table.Td>
                      <Table.Td></Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                      <Table.Td></Table.Td>
                      <Table.Td></Table.Td>
                    </Table.Tr>

                    {item.oneExpenses.map((expense: any) => (
                      <>
                        <Table.Tr>
                          <Table.Td>{expense.name}</Table.Td>
                          <Table.Td>
                            <NumberFormatter
                              thousandSeparator=" "
                              value={expense.cost}
                              suffix=" ₽"
                              decimalScale={2}
                            />
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr h={20}>
                          <Table.Td></Table.Td>
                          <Table.Td></Table.Td>
                        </Table.Tr>
                      </>
                    ))}

                    <Table.Tr>
                      <Table.Td>Сумма единовременных расходов</Table.Td>
                      <Table.Td>
                        <NumberFormatter
                          thousandSeparator=" "
                          value={item.totalOneExpenses}
                          suffix=" ₽"
                          decimalScale={2}
                        />
                      </Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                      <Table.Td></Table.Td>
                      <Table.Td></Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                      <Table.Td>Остаток бюджета</Table.Td>
                      <Table.Td>
                        <NumberFormatter
                          thousandSeparator=" "
                          value={item.beforeOneExpensesBudget}
                          suffix=" ₽"
                          decimalScale={2}
                        />
                      </Table.Td>
                    </Table.Tr>
                  </>
                )}

                <Table.Tr h={60}>
                  <Table.Td></Table.Td>
                  <Table.Td></Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Td>
                    <Text fw={700}>Ежемесячные расходы</Text>
                  </Table.Td>
                  <Table.Td></Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Td></Table.Td>
                  <Table.Td></Table.Td>
                </Table.Tr>

                {item.expenses.map((expense: any) => (
                  <>
                    <Table.Tr>
                      <Table.Td>{expense.name}</Table.Td>
                      <Table.Td>
                        <NumberFormatter
                          thousandSeparator=" "
                          value={expense.cost}
                          suffix=" ₽"
                          decimalScale={2}
                        />
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>Расход в процентах</Table.Td>
                      <Table.Td>
                        <NumberFormatter
                          thousandSeparator=" "
                          value={(expense.cost * 100) / item.totalIncomes}
                          suffix=" %"
                          decimalScale={2}
                        />
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr h={20}>
                      <Table.Td></Table.Td>
                      <Table.Td></Table.Td>
                    </Table.Tr>
                  </>
                ))}

                {item.creditPayment ? (
                  <>
                    <Table.Tr>
                      <Table.Td>Кредит</Table.Td>
                      <Table.Td>
                        <NumberFormatter
                          thousandSeparator=" "
                          value={item.creditPayment}
                          suffix=" ₽"
                          decimalScale={2}
                        />
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>Расход в процентах</Table.Td>
                      <Table.Td>
                        <NumberFormatter
                          thousandSeparator=" "
                          value={(item.creditPayment * 100) / item.totalIncomes}
                          suffix=" %"
                          decimalScale={2}
                        />
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr h={20}>
                      <Table.Td></Table.Td>
                      <Table.Td></Table.Td>
                    </Table.Tr>
                  </>
                ) : (
                  <></>
                )}

                <Table.Tr>
                  <Table.Td>Непредвиденные расходы</Table.Td>
                  <Table.Td>
                    <NumberFormatter
                      thousandSeparator=" "
                      value={item.unforeseenExpenses}
                      suffix=" ₽"
                      decimalScale={2}
                    />
                  </Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Td>Расход в процентах</Table.Td>
                  <Table.Td>
                    <NumberFormatter
                      thousandSeparator=" "
                      value={5}
                      suffix=" %"
                      decimalScale={2}
                    />
                  </Table.Td>
                </Table.Tr>

                <Table.Tr h={20}>
                  <Table.Td></Table.Td>
                  <Table.Td></Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Td>Сумма ежемесячных расходов</Table.Td>
                  <Table.Td>
                    <NumberFormatter
                      thousandSeparator=" "
                      value={item.intermediate}
                      suffix=" ₽"
                      decimalScale={2}
                    />
                  </Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Td>Расход в процентах</Table.Td>
                  <Table.Td>
                    <NumberFormatter
                      thousandSeparator=" "
                      value={(item.intermediate * 100) / item.totalIncomes}
                      suffix=" %"
                      decimalScale={2}
                    />
                  </Table.Td>
                </Table.Tr>

                <Table.Tr h={20}>
                  <Table.Td></Table.Td>
                  <Table.Td></Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Td>Остаток бюджета</Table.Td>
                  <Table.Td>
                    <NumberFormatter
                      thousandSeparator=" "
                      value={item.beforeExpensesBudget}
                      suffix=" ₽"
                      decimalScale={2}
                    />
                  </Table.Td>
                </Table.Tr>

                <Table.Tr h={60}>
                  <Table.Td></Table.Td>
                  <Table.Td></Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Td>
                    <Text fw={700}>Сотрудники</Text>
                  </Table.Td>
                  <Table.Td></Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Td></Table.Td>
                  <Table.Td></Table.Td>
                </Table.Tr>

                {item.employees.map((employee: any) => (
                  <>
                    {employee.type == 'officially' ? (
                      <>
                        <Table.Tr>
                          <Table.Td>{employee.post}</Table.Td>
                          <Table.Td>
                            <NumberFormatter
                              thousandSeparator=" "
                              value={employee.salary}
                              suffix=" ₽"
                              decimalScale={2}
                            />
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>Налог(43%)</Table.Td>
                          <Table.Td>
                            <NumberFormatter
                              thousandSeparator=" "
                              value={employee.persent}
                              suffix=" ₽"
                              decimalScale={2}
                            />
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>Общий расход</Table.Td>
                          <Table.Td>
                            <NumberFormatter
                              thousandSeparator=" "
                              value={employee.salary + employee.persent}
                              suffix=" ₽"
                              decimalScale={2}
                            />
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>Расход в процентах</Table.Td>
                          <Table.Td>
                            <NumberFormatter
                              thousandSeparator=" "
                              value={
                                ((employee.salary + employee.persent) * 100) /
                                item.totalIncomes
                              }
                              suffix=" %"
                              decimalScale={2}
                            />
                          </Table.Td>
                        </Table.Tr>
                      </>
                    ) : (
                      <>
                        <Table.Tr>
                          <Table.Td>{employee.post}</Table.Td>
                          <Table.Td>
                            <NumberFormatter
                              thousandSeparator=" "
                              value={employee.salary}
                              suffix=" ₽"
                              decimalScale={2}
                            />
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>Расход в процентах</Table.Td>
                          <Table.Td>
                            <NumberFormatter
                              thousandSeparator=" "
                              value={
                                (employee.salary * 100) / item.totalIncomes
                              }
                              suffix=" %"
                              decimalScale={2}
                            />
                          </Table.Td>
                        </Table.Tr>
                      </>
                    )}

                    <Table.Tr>
                      <Table.Td></Table.Td>
                      <Table.Td></Table.Td>
                    </Table.Tr>
                  </>
                ))}

                <Table.Tr>
                  <Table.Td>Сумма расходов на сотрудников</Table.Td>
                  <Table.Td>
                    <NumberFormatter
                      thousandSeparator=" "
                      value={item.totalEmployees}
                      suffix=" ₽"
                      decimalScale={2}
                    />
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Расход в процентах</Table.Td>
                  <Table.Td>
                    <NumberFormatter
                      thousandSeparator=" "
                      value={(item.totalEmployees * 100) / item.totalIncomes}
                      suffix=" %"
                      decimalScale={2}
                    />
                  </Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Td></Table.Td>
                  <Table.Td></Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Td>Остаток бюджета</Table.Td>
                  <Table.Td>
                    <NumberFormatter
                      thousandSeparator=" "
                      value={item.beforeEmployeesBudget}
                      suffix=" ₽"
                      decimalScale={2}
                    />
                  </Table.Td>
                </Table.Tr>

                <Table.Tr h={60}>
                  <Table.Td></Table.Td>
                  <Table.Td></Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Td>
                    <Text fw={700}>Налоги</Text>
                  </Table.Td>
                  <Table.Td></Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Td></Table.Td>
                  <Table.Td></Table.Td>
                </Table.Tr>

                {item.taxes.map((tax: any) => (
                  <>
                    <Table.Tr>
                      <Table.Td>{tax.name}</Table.Td>
                      <Table.Td>
                        <NumberFormatter
                          thousandSeparator=" "
                          value={tax.amount}
                          suffix=" ₽"
                          decimalScale={2}
                        />
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>Расход в процентах</Table.Td>
                      <Table.Td>
                        <NumberFormatter
                          thousandSeparator=" "
                          value={(tax.amount * 100) / item.totalIncomes}
                          suffix=" %"
                          decimalScale={2}
                        />
                      </Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                      <Table.Td></Table.Td>
                      <Table.Td></Table.Td>
                    </Table.Tr>
                  </>
                ))}

                <Table.Tr>
                  <Table.Td>Сумма всех налогов</Table.Td>
                  <Table.Td>
                    <NumberFormatter
                      thousandSeparator=" "
                      value={item.totalTaxes}
                      suffix=" ₽"
                      decimalScale={2}
                    />
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Расход в процентах</Table.Td>
                  <Table.Td>
                    <NumberFormatter
                      thousandSeparator=" "
                      value={(item.totalTaxes * 100) / item.totalIncomes}
                      suffix=" %"
                      decimalScale={2}
                    />
                  </Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Td></Table.Td>
                  <Table.Td></Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Td>Остаток бюджета</Table.Td>
                  <Table.Td>
                    <NumberFormatter
                      thousandSeparator=" "
                      value={item.beforeTaxesBudget}
                      suffix=" ₽"
                      decimalScale={2}
                    />
                  </Table.Td>
                </Table.Tr>

                <Table.Tr h={60}>
                  <Table.Td></Table.Td>
                  <Table.Td></Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Td bg="#ffa6a7">
                    <Text fw={500}>Все расходы за данный месяц</Text>
                  </Table.Td>
                  <Table.Td>
                    <NumberFormatter
                      thousandSeparator=" "
                      value={item.resultExpenses}
                      suffix=" ₽"
                      decimalScale={2}
                    />
                  </Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Td></Table.Td>
                  <Table.Td></Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Td bg="#ffd966">
                    <Text fw={500}>Месяц работы</Text>
                  </Table.Td>
                  <Table.Td bg="#ffd966">
                    <Text fw={500}>{`${index + 1} месяц`}</Text>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td bg="#a9d08e">Чистая прибыль</Table.Td>
                  <Table.Td>
                    <NumberFormatter
                      thousandSeparator=" "
                      value={item.cleanProfit}
                      suffix=" ₽"
                      decimalScale={2}
                    />
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Рентабельность по чистой прибыли</Table.Td>
                  <Table.Td>
                    <NumberFormatter
                      thousandSeparator=" "
                      value={item.profitability}
                      suffix=" %"
                      decimalScale={2}
                    />
                  </Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Td></Table.Td>
                  <Table.Td></Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Td>Остаток с того месяца</Table.Td>
                  <Table.Td>
                    <NumberFormatter
                      thousandSeparator=" "
                      value={item.budget}
                      suffix=" ₽"
                      decimalScale={2}
                    />
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Осталось денег в этом месяце</Table.Td>
                  <Table.Td>
                    <NumberFormatter
                      thousandSeparator=" "
                      value={item.budget + item.cleanProfit}
                      suffix=" ₽"
                      decimalScale={2}
                    />
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Остаток по кредиту</Table.Td>
                  <Table.Td>
                    <NumberFormatter
                      thousandSeparator=" "
                      value={item.loanBalance}
                      suffix=" ₽"
                      decimalScale={2}
                    />
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Tabs.Panel>
        ))}
      </Tabs>
    </Flex>
  );
}
