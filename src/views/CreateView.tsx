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

  const form = useForm<FormValues>({
    mode: 'controlled',
    initialValues: {
      sphere: '',
      profit: 0,
      budget: 0,
      budgetType: '',
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
    setDescription(
      spheres.find((item) => item.id == form.values.sphere)?.description ||
        null,
    );
  }, [form.values.sphere]);

  useEffect(() => {
    const s = Number(form.values.interestRate) / 100 / 12;
    const c =
      (s * (1 + s) ** Number(form.values.loanTerm)) / (1 + s) ** (s - 1);

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
                  data={spheres.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
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
                data={spheres.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
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
                    allowNegative={false}
                    min={0}
                    max={100}
                    suffix="%"
                    label="Введите процент налога"
                    placeholder="10"
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