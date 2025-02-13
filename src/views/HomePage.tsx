import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppShell,
  Button,
  Title,
  Text,
  Container,
  Stack,
  Center,
  Group,
  ScrollArea,
} from '@mantine/core';
import type { Plan } from '../types/plan';
import PlanCard from '../components/PlanCard';

const HomePage = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const navigate = useNavigate();

  // Загрузка планов из localStorage (или API) при монтировании компонента
  useEffect(() => {
    const savedPlans = JSON.parse(localStorage.getItem('businessPlans')!) ?? [];
    if (savedPlans.length) {
      setPlans(savedPlans.sort((a, b) => b.createdAt - a.createdAt));
    }
  }, []);

  const handleCreatePlan = () => {
    navigate('/plan/create');
  };

  const handleViewPlan = (planId: string) => {
    // Переход на страницу просмотра плана
    navigate(`/plan/${planId}`);
  };

  const handleDeletePlan = (planId: string) => {
    const filteredPlans = plans.filter((item) => item.id !== planId);

    setPlans(filteredPlans);

    localStorage.setItem('businessPlans', JSON.stringify(filteredPlans));
  };

  return (
    <AppShell.Main pt={60}>
      <Container>
        <Stack gap="60">
          <Stack gap="lg">
            <Title
              order={1}
              style={{ textAlign: 'center', textWrap: 'balance' }}
            >
              Добро пожаловать в программу BizExp!
            </Title>

            <Text
              size="md"
              style={{ textAlign: 'center', textWrap: 'balance' }}
            >
              Данная программа разработана для оказания помощи в&nbsp;создании
              бизнес-планов для тех, кто стремится эффективно и&nbsp;безошибочно
              оценить свой бизнес-проект. Она позволяет глубже проанализировать
              будущую инициативу, выявить возможные ошибки и&nbsp;принять
              взвешенное решение о&nbsp;целесообразности его реализации.
            </Text>

            <Center>
              <Button
                onClick={handleCreatePlan}
                variant="filled"
                radius="md"
                fw={500}
              >
                Создать бизнес-план
              </Button>
            </Center>
          </Stack>

          <Stack gap="lg">
            <Title order={3}>Ваши бизнес-планы:</Title>

            <ScrollArea type="scroll" style={{ width: '100%' }}>
              <Group gap="sm" style={{ flexWrap: 'nowrap' }}>
                {plans.length > 0 ? (
                  plans.map((plan) => (
                    <PlanCard
                      key={plan.id}
                      plan={plan}
                      onOpen={handleViewPlan}
                      onDelete={handleDeletePlan}
                    />
                  ))
                ) : (
                  <Text>У вас пока нет созданных планов.</Text>
                )}
              </Group>
            </ScrollArea>
          </Stack>
        </Stack>
      </Container>
    </AppShell.Main>
  );
};

export default HomePage;
