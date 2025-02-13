import { useParams } from 'react-router-dom';
import { Flex, NumberFormatter, Table, Tabs, Text } from '@mantine/core';
import { useStore } from '../store/planes';

export default function PlaneCoffeeView() {
  let { id } = useParams();
  const { getPlane } = useStore();
  const plane = getPlane(id as string);

  return <>Hellp</>;
}
