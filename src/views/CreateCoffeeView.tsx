import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextInput,
  Select,
  Stepper,
  Paper,
  Flex,
  Group,
  Container,
  Radio,
  NumberInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { v4 as uuid } from 'uuid';
import RepairCostsList from '../components/coffee/RepairCostsList';

// Step interfaces
type Step = {
  id: number;
  title: string;
  content: JSX.Element;
  note?: JSX.Element;
};

export default function CreateCoffeeView() {
  const [currentStep, setCurrentStep] = useState(0);

  const navigation = useNavigate();

  const form = useForm({
    initialValues: {
      profitGoal: '',
      rent: '',
      rentCost: '',
      propertyCost: '',
      repairCosts: '',
      hasEquipment: '',
      equipmentDetails: '',
      equipmentPlan: '',
      businessType: '',
      franchiseCost: '',
      royalty: '',
      financing: '',
      fullLoan: '',
      loanAmount: '',
      loanTerm: '',
      loanRate: '',
      expenses: [],
    },
  });

  const handleCalculate = () => {
    const id = uuid();

    navigation('/coffee/' + id);
  };

  const steps: Step[] = [
    {
      id: 0,
      title: 'Ваша цель',
      content: (
        <NumberInput
          allowNegative={false}
          thousandSeparator=" "
          placeholder="Введите сумму в рублях"
          label="Какую прибыль в месяц Вы хотите получать?"
          key={form.key('profitGoal')}
          {...form.getInputProps('profitGoal')}
        />
      ),
    },
    {
      id: 1,
      title: 'Аренда помещения',
      content: (
        <Flex direction="column" gap={20}>
          <Radio.Group
            label="Вы планируете арендовать помещение?"
            withAsterisk
            key={form.key('rent')}
            {...form.getInputProps('rent')}
          >
            <Group mt="xs">
              <Radio value="yes" label="Да" />
              <Radio value="no" label="Нет" />
            </Group>
          </Radio.Group>

          {form.values.rent === 'yes' && (
            <NumberInput
              allowNegative={false}
              thousandSeparator=" "
              label="Введите стоимость аренды"
              placeholder="Введите сумму в рублях"
              key={form.key('rentCost')}
              {...form.getInputProps('rentCost')}
            />
          )}
          {form.values.rent === 'no' && (
            <NumberInput
              allowNegative={false}
              thousandSeparator=" "
              label="Введите стоимость помещения"
              placeholder="Введите сумму в рублях"
              key={form.key('propertyCost')}
              {...form.getInputProps('propertyCost')}
            />
          )}
        </Flex>
      ),
    },
    {
      id: 2,
      title: 'Стоимость ремонта',
      content: <RepairCostsList form={form} />,
    },
    {
      id: 3,
      title: 'Оборудование',
      content: (
        <Flex direction="column" gap={20}>
          <Radio.Group
            label="У вас есть кофейное оборудование?"
            withAsterisk
            key={form.key('hasEquipment')}
            {...form.getInputProps('hasEquipment')}
          >
            <Group mt="xs">
              <Radio value="yes" label="Да" />
              <Radio value="no" label="Нет" />
            </Group>
          </Radio.Group>

          {form.values.hasEquipment === 'yes' && (
            <TextInput
              label="Укажите имеющееся оборудование"
              placeholder="Например, кофемашина, кофемолка"
              key={form.key('equipmentDetails')}
              {...form.getInputProps('equipmentDetails')}
            />
          )}
          {form.values.hasEquipment === 'no' && (
            <Select
              label="Планируете купить или взять в аренду оборудование?"
              placeholder="Выберите..."
              data={[
                { value: 'buy', label: 'Купить' },
                { value: 'rent', label: 'Взять в аренду' },
              ]}
              key={form.key('equipmentPlan')}
              {...form.getInputProps('equipmentPlan')}
            />
          )}
        </Flex>
      ),
    },
    {
      id: 4,
      title: 'Открытие',
      content: (
        <Flex direction="column" gap={20}>
          <Select
            label="Вы планируете открытие по франшизе или самостоятельно?"
            placeholder="Выберите..."
            data={[
              { value: 'franchise', label: 'Франшиза' },
              { value: 'independent', label: 'Собственное открытие' },
            ]}
            key={form.key('businessType')}
            {...form.getInputProps('businessType')}
          />
          {form.values.businessType === 'franchise' && (
            <>
              <NumberInput
                allowNegative={false}
                thousandSeparator=" "
                label="Стоимость франшизы"
                placeholder="Введите сумму в рублях"
                key={form.key('franchiseCost')}
                {...form.getInputProps('franchiseCost')}
              />

              <NumberInput
                allowNegative={false}
                thousandSeparator=" "
                label="Процент роялти"
                placeholder="Введите процент"
                key={form.key('royalty')}
                {...form.getInputProps('royalty')}
              />
            </>
          )}
        </Flex>
      ),
    },
    {
      id: 5,
      title: 'Финансирование',
      content: (
        <Flex direction="column" gap={20}>
          <Select
            label="Используете ли вы кредит или собственные средства?"
            placeholder="Выберите..."
            data={[
              { value: 'loan', label: 'Кредит' },
              { value: 'ownFunds', label: 'Собственные средства' },
            ]}
            key={form.key('financing')}
            {...form.getInputProps('financing')}
          />
          {form.values.financing === 'loan' && (
            <>
              <Select
                label="Вся сумма в кредит?"
                placeholder="Выберите..."
                data={[
                  { value: 'yes', label: 'Да' },
                  { value: 'no', label: 'Нет' },
                ]}
                key={form.key('fullLoan')}
                {...form.getInputProps('fullLoan')}
              />
              <NumberInput
                allowNegative={false}
                thousandSeparator=" "
                label="Сумма кредита"
                placeholder="Введите сумму в рублях"
                key={form.key('loanAmount')}
                {...form.getInputProps('loanAmount')}
              />
              <NumberInput
                allowNegative={false}
                thousandSeparator=" "
                label="Срок кредита (в месяцах)"
                placeholder="Введите срок в месяцах"
                key={form.key('loanTerm')}
                {...form.getInputProps('loanTerm')}
              />
              <NumberInput
                allowNegative={false}
                thousandSeparator=" "
                label="Процентная ставка кредита"
                placeholder="Введите процент"
                key={form.key('loanRate')}
                {...form.getInputProps('loanRate')}
              />
            </>
          )}
        </Flex>
      ),
    },
  ];

  return (
    <Paper shadow="sm" p="lg" radius="md" withBorder>
      <Stepper active={currentStep} onStepClick={setCurrentStep} size="xs">
        {steps.map((step) => (
          <Stepper.Step key={step.id} label={step.title}>
            <Flex component="main" py={60} justify="center" align="center">
              <Container>{step.content}</Container>
            </Flex>
          </Stepper.Step>
        ))}
      </Stepper>
      <Group justify="center" mt="xl">
        {currentStep === 0 ? (
          <Button
            onClick={() => alert('Переход на главную страницу')}
            variant="default"
          >
            Вернуться
          </Button>
        ) : (
          <Button
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            disabled={currentStep === 0}
            variant="default"
          >
            Назад
          </Button>
        )}

        {currentStep === steps.length - 1 ? (
          <Button onClick={handleCalculate}>Расчитать план</Button>
        ) : (
          <Button
            onClick={() =>
              setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
            }
          >
            Далее
          </Button>
        )}
      </Group>
    </Paper>
  );
}
