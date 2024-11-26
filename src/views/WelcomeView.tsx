import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, Center, Container, Flex } from '@mantine/core';

export default function WelcomeView() {
  const navigate = useNavigate();

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
      </Container>
    </Flex>
  );
}
