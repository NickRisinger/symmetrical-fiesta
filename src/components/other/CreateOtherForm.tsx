import { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Flex,
  Group,
  NumberInput,
  Radio,
  Select,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import ExpenseList from '../ExpenseList';
import IncomeList from '../IncomeList';
import EmployeeList from '../EmployeeList';
import { calculate } from '../../utils/calculate';

const BUDGET_TYPE = [
  { value: 'personal', label: 'Личный капитал' },
  { value: 'credit', label: 'Кредит' },
];

const LEGAL_FORM = [
  { value: 'llc', label: 'ООО' },
  { value: 'individual-1', label: 'ИП УСН(Доходы)' },
  { value: 'individual-2', label: 'ИП УСН(Доходы минус расходы)' },
  { value: 'self-employed', label: 'Самозанятый' },
  { value: 'unregister', label: 'Без юридического статуса' },
  { value: 'personal', label: 'Пользовательский процент' },
];

const CreateOtherForm = ({
  onSubmit,
  onBack,
}: {
  onSubmit: (values: any) => void;
  onBack: () => void;
}) => {
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [isDisabledTaxRate, setDisabledTaxRate] = useState<boolean>(true);

  const form = useForm({
    mode: 'controlled',
    validateInputOnBlur: true,
    initialValues: {
      sphere: '0',
      profit: 0,
      budget: 0,
      budgetType: 'personal',
      loanAmount: '',
      loanTerm: '',
      interestRate: '',
      monthlyPayment: 0,
      legalForm: '',
      taxRate: '',
      expenses: [],
      incomes: [],
      employees: [],
    },
  });

  useEffect(() => {
    if (form.values.legalForm == 'personal') {
      setDisabledTaxRate(false);
      return;
    }

    setDisabledTaxRate(true);

    if (form.values.legalForm == 'llc') {
      form.setFieldValue('taxRate', '20');
    } else if (form.values.legalForm == 'individual-1') {
      form.setFieldValue('taxRate', '6');
    } else if (form.values.legalForm == 'individual-2') {
      form.setFieldValue('taxRate', '15');
    } else if (form.values.legalForm == 'self-employed') {
      form.setFieldValue('taxRate', '4');
    } else if (form.values.legalForm == 'unregister') {
      form.setFieldValue('taxRate', '');
    }
  }, [form.values.legalForm]);

  useEffect(() => {
    const s = Number(form.values.interestRate) / 100 / 12;
    const lt = Number(form.values.loanTerm);
    const c = (s * (1 + s) ** lt) / ((1 + s) ** lt - 1);

    setMonthlyPayment(Math.round(Number(form.values.loanAmount) * c));
  }, [form.values.loanTerm, form.values.interestRate]);

  const handleSubmit = (values: typeof form.values) => {
    const result = calculate(values);
    onSubmit(result);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex
        component="main"
        py={60}
        style={{ overflow: 'hidden' }}
        justify="center"
        align="center"
      >
        <Container>
          <Flex direction="column" gap={20} w={420}>
            <NumberInput
              allowNegative={false}
              thousandSeparator=" "
              label="Желаемая прибыль с проекта"
              key={form.key('profit')}
              {...form.getInputProps('profit')}
            />

            <NumberInput
              allowNegative={false}
              thousandSeparator=" "
              label="Стартовый бюджет на проект"
              key={form.key('budget')}
              {...form.getInputProps('budget')}
            />

            <Radio.Group
              name="favoriteFramework"
              withAsterisk
              key={form.key('budgetType')}
              {...form.getInputProps('budgetType')}
            >
              <Group mt="xs">
                {BUDGET_TYPE.map((item) => (
                  <Radio
                    key={item.value}
                    value={item.value}
                    label={item.label}
                  />
                ))}
              </Group>
            </Radio.Group>

            {form.values.budgetType === 'credit' && (
              <>
                <NumberInput
                  allowNegative={false}
                  label="Сумма кредита"
                  thousandSeparator=" "
                  rightSectionPointerEvents="none"
                  key={form.key('loanAmount')}
                  {...form.getInputProps('loanAmount')}
                />

                <Group mt="xs" grow>
                  <NumberInput
                    allowNegative={false}
                    label="Срок кредита"
                    placeholder="1"
                    rightSection={<Text size="xs">мес.</Text>}
                    rightSectionPointerEvents="none"
                    key={form.key('loanTerm')}
                    {...form.getInputProps('loanTerm')}
                  />

                  <NumberInput
                    allowNegative={false}
                    min={0}
                    max={100}
                    suffix="%"
                    label="Процент кредита"
                    placeholder="10"
                    key={form.key('interestRate')}
                    {...form.getInputProps('interestRate')}
                  />
                </Group>

                {Boolean(monthlyPayment) && (
                  <Text>Ежемесячный платеж: {monthlyPayment}р.</Text>
                )}
              </>
            )}

            {form.values.profit > 0 && form.values.budget > 0 && (
              <>
                <Select
                  label="Выберите юридическое оформление"
                  data={LEGAL_FORM}
                  key={form.key('legalForm')}
                  {...form.getInputProps('legalForm')}
                />

                <NumberInput
                  disabled={isDisabledTaxRate}
                  allowNegative={false}
                  min={0}
                  max={100}
                  suffix="%"
                  label="Введите процент налога"
                  key={form.key('taxRate')}
                  {...form.getInputProps('taxRate')}
                />
              </>
            )}

            <ExpenseList form={form} />

            <IncomeList form={form} />

            <EmployeeList form={form} />

            <Group justify="center" mt="xl">
              <Button onClick={onBack} variant="default">
                Вернуться
              </Button>
              <Button type="submit">Рассчитать</Button>
            </Group>
          </Flex>
        </Container>
      </Flex>
    </form>
  );
};

export default CreateOtherForm;
