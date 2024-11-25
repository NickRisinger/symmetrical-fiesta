import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline';
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
import { UseFormReturnType } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { FormValues } from '../types';

const INCOME: Record<string, string> = {
  officially: 'Официальное',
  unofficially: 'Неофициальное',
};

const EMPLOYEE_TYPE = [
  { value: 'officially', label: 'Официальное трудоустройство' },
  { value: 'unofficially', label: 'Неофициальное трудоустройство' },
];

type Employee = { post: any; type: any; salary: any };

export default function EmployeeList({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  const [opened, { open, close }] = useDisclosure(false);

  const [employee, setEmployee] = useState<Employee>({
    post: '',
    type: '',
    salary: '',
  });

  const deleteEmployee = (index: number) => {
    form.removeListItem('employees', index);
  };

  const addEmployee = () => {
    setEmployee({
      post: '',
      type: '',
      salary: '',
    });

    form.insertListItem('employees', { ...employee, id: uuid() });

    close();
  };

  return (
    <Flex mt={10} gap={10} direction="column">
      <Group justify="space-between">
        <Title order={4}>Сотрудники</Title>
        <Button onClick={open} variant="light">
          Добавить
        </Button>
      </Group>

      <Table highlightOnHover withTableBorder withColumnBorders>
        <Table.Tbody>
          {form.values.employees.length ? (
            form.values.employees.map((element, index) => (
              <Table.Tr key={element.id}>
                <Table.Td>{INCOME[element.type]}</Table.Td>
                <Table.Td>{element.post}</Table.Td>
                <Table.Td>{element.salary}</Table.Td>
                <Table.Td>
                  <ActionIcon
                    onClick={() => deleteEmployee(index)}
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
            value={employee ? employee.post : null}
            onChange={(event) =>
              setEmployee((item) => ({
                ...item,
                post: event.target.value,
              }))
            }
            placeholder="Должность сотрудника"
          />

          <NumberInput
            value={employee ? employee.salary : null}
            onChange={(value) =>
              setEmployee((item) => ({ ...item, salary: value }))
            }
            allowNegative={false}
            thousandSeparator=" "
            placeholder="Зарплата"
          />

          <Radio.Group
            value={employee ? employee.type : null}
            onChange={(value) =>
              setEmployee((item) => ({ ...item, type: value }))
            }
            name="favoriteFramework"
            withAsterisk
          >
            <Group mt="xs">
              {EMPLOYEE_TYPE.map((item) => (
                <Radio key={item.value} value={item.value} label={item.label} />
              ))}
            </Group>
          </Radio.Group>

          <Group justify="flex-end">
            <Button onClick={addEmployee}>Сохранить</Button>
          </Group>
        </Flex>
      </Modal>
    </Flex>
  );
}
