import { Flex, Table, Tabs } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useStore } from '../store/planes';

export default function PlaneView() {
  let { id } = useParams();
  const { getPlane } = useStore();
  const plane = getPlane(id as string);

  return (
    <Flex
      component="main"
      style={{ overflow: 'hidden' }}
      justify="center"
      align="center"
    >
      <Tabs defaultValue="1">
        <Tabs.List>
          <Tabs.Tab value="1">1 месяц</Tabs.Tab>
          <Tabs.Tab value="2">2 месяц</Tabs.Tab>
          <Tabs.Tab value="3">3 месяц</Tabs.Tab>
          <Tabs.Tab value="4">4 месяц</Tabs.Tab>
          <Tabs.Tab value="5">5 месяц</Tabs.Tab>
          <Tabs.Tab value="6">6 месяц</Tabs.Tab>
          <Tabs.Tab value="7">7 месяц</Tabs.Tab>
          <Tabs.Tab value="8">8 месяц</Tabs.Tab>
          <Tabs.Tab value="9">9 месяц</Tabs.Tab>
          <Tabs.Tab value="10">10 месяц</Tabs.Tab>
          <Tabs.Tab value="11">11 месяц</Tabs.Tab>
          <Tabs.Tab value="12">12 месяц</Tabs.Tab>
          <Tabs.Tab value="back">Вернуться на главную</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="1">
          <Table highlightOnHover withTableBorder withColumnBorders>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>{JSON.stringify(plane)}</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Tabs.Panel>

        <Tabs.Panel value="2">
          <Table highlightOnHover withTableBorder withColumnBorders>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>
                  ПРоизошла ошибка при рассчетах, попробуйте позже
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Tabs.Panel>

        <Tabs.Panel value="3">
          <Table highlightOnHover withTableBorder withColumnBorders>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>
                  ПРоизошла ошибка при рассчетах, попробуйте позже
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Tabs.Panel>
      </Tabs>
    </Flex>
  );
}
