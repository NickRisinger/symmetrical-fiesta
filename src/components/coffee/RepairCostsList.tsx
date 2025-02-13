import { useState } from 'react';
import {
  ActionIcon,
  Group,
  Table,
  Flex,
  Title,
  Modal,
  Button,
  TextInput,
  NumberInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { UseFormReturnType } from '@mantine/form';
import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline';
import { v4 as uuid } from 'uuid';

export default function RepairCostsList({
  form,
}: {
  form: UseFormReturnType<any>;
}) {
  const [opened, { open, close }] = useDisclosure(false);

  const [expense, setExpense] = useState<any>({
    name: '',
    cost: '',
  });

  const deleteExpense = (index: number) => {
    form.removeListItem('expenses', index);
  };

  const addExpense = () => {
    setExpense({
      name: '',
      cost: '',
    });

    form.insertListItem('repairExpenses', { ...expense, id: uuid() });

    close();
  };

  return (
    <Flex mt={10} gap={10} direction="column">
      <Group justify="space-between">
        <Title order={4}>
          Стоимость ремонта (вы можете добавить несколько статей расходов)
        </Title>
        <Button onClick={open} variant="light">
          Добавить
        </Button>
      </Group>

      <Table highlightOnHover withTableBorder withColumnBorders>
        <Table.Tbody>
          {form.values.expenses.length ? (
            form.values.expenses.map((element, index) => (
              <Table.Tr key={element.id}>
                <Table.Td>{element.name}</Table.Td>
                <Table.Td>{element.cost}</Table.Td>
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
          <TextInput
            value={expense ? expense.name : null}
            onChange={(event) =>
              setExpense((item) => ({
                ...item,
                name: event.target.value,
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

          <Group justify="flex-end">
            <Button onClick={addExpense}>Сохранить</Button>
          </Group>
        </Flex>
      </Modal>
    </Flex>
  );
}
