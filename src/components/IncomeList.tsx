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
  Radio,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline';
import { v4 as uuid } from 'uuid';
import { UseFormReturnType } from '@mantine/form';
import { FormValues } from '../types';

const INCOME: Record<string, string> = {
  client: 'Клиент/средний чек',
  straight: 'Прямой доход',
};

const INCOME_TYPE = [
  { value: 'client', label: 'Клиент/средний чек' },
  { value: 'straight', label: 'Прямой доход' },
];

type Income = { type: any; name: any; cost: any };

export default function IncomeList({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  const [opened, { open, close }] = useDisclosure(false);

  const [income, setIncome] = useState<Income>({
    type: '',
    name: '',
    cost: '',
  });

  const deleteIncome = (index: number) => {
    form.removeListItem('incomes', index);
  };

  const addIncome = () => {
    setIncome({
      type: '',
      name: '',
      cost: '',
    });

    form.insertListItem('incomes', { ...income, id: uuid() });

    close();
  };

  return (
    <Flex mt={10} gap={10} direction="column">
      <Group justify="space-between">
        <Title order={4}>Доходы</Title>
        <Button onClick={open} variant="light">
          Добавить
        </Button>
      </Group>

      <Table highlightOnHover withTableBorder withColumnBorders>
        <Table.Tbody>
          {form.values.incomes.length ? (
            form.values.incomes.map((element, index) => (
              <Table.Tr key={element.name}>
                <Table.Td>{INCOME[element.type]}</Table.Td>
                <Table.Td>{element.name}</Table.Td>
                <Table.Td>{element.cost}</Table.Td>
                <Table.Td>
                  <ActionIcon
                    onClick={() => deleteIncome(index)}
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
              <Table.Td>Доходы еще не заполнены</Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>

      <Modal opened={opened} onClose={close} title="Добавление дохода" centered>
        <Flex direction="column" gap={20}>
          <TextInput
            value={income ? income.name : null}
            onChange={(event) =>
              setIncome((item) => ({
                ...item,
                name: event.target.value,
              }))
            }
            placeholder="Название дохода"
          />

          <Radio.Group
            value={income ? income.type : null}
            onChange={(value) =>
              setIncome((item) => ({ ...item, type: value }))
            }
            name="favoriteFramework"
            withAsterisk
          >
            <Group mt="xs">
              {INCOME_TYPE.map((item) => (
                <Radio key={item.value} value={item.value} label={item.label} />
              ))}
            </Group>
          </Radio.Group>

          <NumberInput
            value={income ? income.cost : null}
            onChange={(value) =>
              setIncome((item) => ({ ...item, cost: value }))
            }
            allowNegative={false}
            thousandSeparator=" "
            placeholder="Сумма дохода"
          />

          <Group justify="flex-end">
            <Button onClick={addIncome}>Сохранить</Button>
          </Group>
        </Flex>
      </Modal>
    </Flex>
  );
}
