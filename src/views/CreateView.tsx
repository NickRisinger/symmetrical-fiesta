import { useEffect, useState } from 'react';
import {
  Button,
  Center,
  Container,
  Flex,
  Group,
  NumberInput,
  Radio,
  Select,
  Text,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';

import ExpenseList from '../components/ExpenseList';
import IncomeList from '../components/IncomeList';

import { spheres } from '../constants';
import { useStore } from '../store/planes';
import EmployeeList from '../components/EmployeeList';
import { FormValues } from '../types';

const BUDGET_TYPE = [
  { value: 'personal', label: 'Личный капитал' },
  { value: 'credit', label: 'Кредит' },
];

const LEGAL_FORM = [
  { value: 'llc', label: 'ООО' },
  { value: 'individual-1', label: 'ИП УСН(Доходы)' },
  { value: 'individual-2', label: 'ИП УСН(Доходы минус расходы)' },
  { value: 'self-employed', label: 'Самозанятый' },
  { value: 'unregister', label: 'Без уридического статуса' },
  { value: 'personal', label: 'Пользовательский процент' },
];

export default function CreateView() {
  const navigation = useNavigate();
  const { addPlane } = useStore();
  const [description, setDescription] = useState<string | null>(null);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const [isVisibelForm, setVisibelForm] = useState<boolean>(false);
  const [isDisabledTaxRate, setDisabledTaxRate] = useState<boolean>(true);

  const form = useForm<FormValues>({
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

    validate: {
      expenses: (value) =>
        value.length < 0 ? 'Name must have at least 2 letters' : null,
      incomes: (value) =>
        value.length < 0 ? 'Name must have at least 2 letters' : null,
      profit: (value) =>
        value < 0 ? 'You must be at least 18 to register' : null,
      budget: (value) =>
        value < 0 ? 'You must be at least 18 to register' : null,
    },
  });

  useEffect(() => {
    setDescription(
      spheres.find((item) => item.value == form.values.sphere)?.description ||
        null,
    );
  }, [form.values.sphere]);

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
    // const s = plane.interestRate / 100 / 12;
    // const c = (s * (1 + s) ** plane.loanTerm) / ((1 + s) ** plane.loanTerm - 1);
    //
    // creditPayment = plane.loanAmount * c;

    const s = Number(form.values.interestRate) / 100 / 12;
    const lt = Number(form.values.loanTerm);
    const c = (s * (1 + s) ** lt) / ((1 + s) ** lt - 1);

    setMonthlyPayment(Math.round(Number(form.values.loanAmount) * c));
  }, [form.values.loanTerm, form.values.interestRate]);

  const handleSubmit = (values: typeof form.values) => {
    const id = uuid();

    addPlane({ ...values, id: id, isCompleted: true });

    navigation('/' + id);
  };

  const handleNext = () => {
    setVisibelForm(true);
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
          {!isVisibelForm && (
            <Flex direction="column" gap={20}>
              <Center>
                <Title order={2}>Выберите сферу бизнеса</Title>
              </Center>

              <Center>
                <Select
                  w={300}
                  data={spheres}
                  key={form.key('sphere')}
                  {...form.getInputProps('sphere')}
                />
              </Center>

              {description && (
                <Center>
                  <Text
                    size="md"
                    style={{ textAlign: 'center', textWrap: 'balance' }}
                  >
                    {description}
                  </Text>
                </Center>
              )}

              <Center>
                <Button
                  variant="filled"
                  radius="md"
                  fw={500}
                  onClick={handleNext}
                >
                  Продолжить
                </Button>
              </Center>
            </Flex>
          )}

          {isVisibelForm && (
            <Flex direction="column" gap={20} w={420}>
              <Select
                label="Выберите сфера бизнеса"
                data={spheres}
                key={form.key('sphere')}
                {...form.getInputProps('sphere')}
              />

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

                  <Group mt="xs">
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

                  {monthlyPayment > 0 && (
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

              <Button type="submit" fullWidth>
                Рассчитать
              </Button>
            </Flex>
          )}
        </Container>
      </Flex>
    </form>
  );
}
