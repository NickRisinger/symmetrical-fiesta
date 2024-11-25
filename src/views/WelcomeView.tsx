import { useNavigate } from 'react-router-dom';
import {
  Title,
  Text,
  Button,
  Center,
  Container,
  Flex,
  Card,
  Group,
} from '@mantine/core';
import { useStore } from '../store/planes';

export default function WelcomeView() {
  const navigate = useNavigate();

  const { planes } = useStore();

  return (
    <Flex h="100%" component="main" justify="center" align="center">
      <Container>
        <Flex direction="column" gap={20}>
          <Center>
            <Title order={2}>Добро пожаловать в программу BizExp</Title>
          </Center>

          <Text size="md" style={{ textAlign: 'center', textWrap: 'balance' }}>
            Данная программа разработана для оказания помощи в&nbsp;создании
            бизнес-планов для тех, кто стремится эффективно и&nbsp;безошибочно
            оценить свой бизнес-проект. Она позволяет глубже проанализировать
            будущую инициативу, выявить возможные ошибки и&nbsp;принять
            взвешенное решение о&nbsp;целесообразности его реализации.
          </Text>

          <Center>
            <Button
              variant="filled"
              radius="md"
              fw={500}
              onClick={() => navigate('/create')}
            >
              Создать бизнес-план
            </Button>
          </Center>
        </Flex>

        {planes.length ? (
          <Flex mt={50} gap={10} direction="column">
            <Title order={4}>Ваши бизнес-планы</Title>

            <Group gap={20}>
              {planes.map((plan) => (
                <Card
                  key={plan.id}
                  shadow="sm"
                  padding="sm"
                  radius="md"
                  withBorder
                >
                  <Group justify="space-between" mb="xs">
                    <Text fw={500}>{plan.sphere}</Text>
                  </Group>

                  <Group justify="space-between" wrap="nowrap">
                    <Button color="blue" radius="md" fw={500}>
                      Изменить
                    </Button>

                    <Button color="blue" radius="md" fw={500}>
                      Посмотреть
                    </Button>
                  </Group>
                </Card>
              ))}
            </Group>
          </Flex>
        ) : (
          <div></div>
        )}
      </Container>
    </Flex>
  );
}
