import { useNavigate, useParams } from 'react-router-dom';
import { AppShell } from '@mantine/core';
import CreateCoffeeForm from '../components/coffee/CreateCoffeeForm';
import CreateOtherForm from '../components/other/CreateOtherForm';
import { SphereType } from '../constants/sphere';
import { v4 as uuid } from 'uuid';
import type { Plan } from '../types/plan';

const PlanCreatePage = () => {
  const navigate = useNavigate();
  const { name: planType } = useParams<{ name: SphereType }>();

  const createPlan = (values: any) => {
    const newPlan: Plan = {
      id: uuid(),
      type: planType,
      createdAt: new Date(),
      data: values,
    };

    const savedPlans = JSON.parse(
      localStorage.getItem('businessPlans') || '[]',
    );

    const updatedPlans = [...savedPlans, newPlan];

    localStorage.setItem('businessPlans', JSON.stringify(updatedPlans));

    navigate(`/plan/${newPlan.id}`);
  };

  const handelBack = () => {
    navigate('/');
  };

  return (
    <AppShell.Main>
      {planType === SphereType.Coffee && (
        <CreateCoffeeForm onSubmit={createPlan} onBack={handelBack} />
      )}
      {planType === SphereType.Other && (
        <CreateOtherForm onSubmit={createPlan} onBack={handelBack} />
      )}
    </AppShell.Main>
  );
};

export default PlanCreatePage;
