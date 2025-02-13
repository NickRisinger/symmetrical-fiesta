import { Routes, Route } from 'react-router-dom';
import { AppShell } from '@mantine/core';
import HomePage from './views/HomePage';
import ChooseTypePlanPage from './views/ChooseTypePlanPage';
import PlanCreatePage from './views/PlanCreatePage';
import PlanViewPage from './views/PlanViewPage';

export default function App() {
  return (
    <AppShell padding="md">
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="plan/create" element={<ChooseTypePlanPage />} />
          <Route path="plan/create/:name" element={<PlanCreatePage />} />
          <Route path="plan/:id" element={<PlanViewPage />} />
        </Route>
      </Routes>
    </AppShell>
  );
}
