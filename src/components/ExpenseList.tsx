import { useState } from 'react';
import {
  ActionIcon,
  Group,
  Table,
  Flex,
  Title,
  Modal,
  Button,
  Select,
  TextInput,
  NumberInput,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline';
import { v4 as uuid } from 'uuid';
import { UseFormReturnType } from '@mantine/form';
import { FormValues } from '../types';

const EXPENSE: Record<string, string> = {
  'one-time': 'Единоразовый',
  constant: 'Постоянный',
};

const EXPENSE_TYPES = [
  { value: 'one-time', label: 'Единоразовый' },
  { value: 'constant', label: 'Постоянный' },
];

type Expense = { type: any; name: any; cost: any; period: any };

export default function ExpenseList({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  const [opened, { open, close }] = useDisclosure(false);

  const [expense, setExpense] = useState<Expense>({
    type: '',
    name: '',
    cost: '',
    period: '',
  });

  const deleteExpense = (index: number) => {
    form.removeListItem('expenses', index);
  };

  const addExpense = () => {
    setExpense({
      type: '',
      name: '',
      cost: '',
      period: '',
    });

    form.insertListItem('expenses', { ...expense, id: uuid() });

    close();
  };

  return (
    <Flex mt={10} gap={10} direction="column">
      <Group justify="space-between">
        <Title order={4}>Расходы</Title>
        <Button onClick={open} variant="light">
          Добавить
        </Button>
      </Group>

      <Table highlightOnHover withTableBorder withColumnBorders>
        <Table.Tbody>
          {form.values.expenses.length ? (
            form.values.expenses.map((element, index) => (
              <Table.Tr key={element.id}>
                <Table.Td>{EXPENSE[element.type]}</Table.Td>
                <Table.Td>{element.name}</Table.Td>
                <Table.Td>{element.cost}</Table.Td>
                <Table.Td>{element.period}</Table.Td>
                <Table.Td>
                  <ActionIcon
                    onClick={() => deleteExpense(index)}
                    variant="filled"
                    color="red"
                    aria-label="Settings"
                  >
                    <ArchiveBoxXMarkIcon
                      style={{ width: '70%', height: '70%' }}
                    />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <Table.Td>Расходы еще не заполнены</Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>

      <Modal
        opened={opened}
        onClose={close}
        title="Добавление расхода"
        centered
      >
        <Flex direction="column" gap={20}>
          <Select
            data={EXPENSE_TYPES}
            value={expense ? expense.type : null}
            onChange={(_value, option) =>
              setExpense((item) => ({ ...item, type: option.value }))
            }
            placeholder="Тип расхода"
          />

          <TextInput
            value={expense ? expense.name : null}
            onChange={(event) =>
              setExpense((item) => ({
                ...item,
                name: event.currentTarget.value,
              }))
            }
            placeholder="Название расхода"
          />

          <NumberInput
            value={expense ? expense.cost : null}
            onChange={(value) =>
              setExpense((item) => ({ ...item, cost: value }))
            }
            allowNegative={false}
            thousandSeparator=" "
            placeholder="Сумма расхода"
          />

          <NumberInput
            disabled={expense.type !== 'constant'}
            value={expense ? expense.period : null}
            onChange={(value) =>
              setExpense((item) => ({ ...item, period: value }))
            }
            allowNegative={false}
            rightSection={<Text size="xs">мес.</Text>}
            rightSectionPointerEvents="none"
            placeholder="Переодичность расхода"
          />

          <Group justify="flex-end">
            <Button onClick={addExpense}>Сохранить</Button>
          </Group>
        </Flex>
      </Modal>
    </Flex>
  );
}
