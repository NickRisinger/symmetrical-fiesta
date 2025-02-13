import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Title, AppShell, Group, Button } from '@mantine/core';
import { SphereType } from '../constants/sphere';

import PlaneOtherView from '../components/other/PlaneOtherView';
import PlaneCoffeeView from '../components/coffee/PlaneCoffeeView';

const PlanViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [plan, setPlan] = useState<any>(null);

  useEffect(() => {
    const savedPlans = JSON.parse(
      localStorage.getItem('businessPlans') || '[]',
    );

    console.log(savedPlans);

    const savedPlan = savedPlans.find((item) => item.id === id);

    setPlan(savedPlan);

    console.log(savedPlan);
  }, []);

  const onBack = () => {
    navigate('/');
  };

  return (
    <AppShell.Main>
      <Group justify="space-between">
        <Title order={1}>Просмотр плана</Title>
        <Button onClick={onBack} variant="default">
          Вернуться
        </Button>
      </Group>

      {plan?.type === SphereType.Coffee && <PlaneCoffeeView plan={plan} />}
      {plan?.type === SphereType.Other && <PlaneOtherView plan={plan} />}
    </AppShell.Main>
  );
};

export default PlanViewPage;
