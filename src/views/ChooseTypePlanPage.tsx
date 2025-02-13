import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Title,
  Text,
  Container,
  AppShell,
  Flex,
  Center,
  Select,
  Button,
} from '@mantine/core';
import { SPHERES } from '../constants/sphere';

const ChooseTypePlanPage = () => {
  const navigate = useNavigate();

  const [planeType, setPlaneType] = useState<any>(null);

  const handleCreatePlan = () => {
    navigate(`/plan/create/${planeType.value}`);
  };

  return (
    <AppShell.Main pt={60}>
      <Container>
        <Flex direction="column" gap={20}>
          <Center>
            <Title order={2}>Выберите сферу бизнеса</Title>
          </Center>

          <Center>
            <Select
              w={300}
              placeholder="Выберите сферу"
              data={SPHERES}
              value={planeType ? planeType.value : null}
              onChange={(_value, option) => setPlaneType(option)}
            />
          </Center>

          {planeType?.description && (
            <Center>
              <Text
                w={600}
                size="md"
                style={{ textAlign: 'center', textWrap: 'balance' }}
              >
                {planeType.description}
              </Text>
            </Center>
          )}

          <Center>
            <Button
              variant="filled"
              radius="md"
              fw={500}
              onClick={handleCreatePlan}
              disabled={!planeType}
            >
              Продолжить
            </Button>
          </Center>
        </Flex>
      </Container>
    </AppShell.Main>
  );
};

export default ChooseTypePlanPage;
