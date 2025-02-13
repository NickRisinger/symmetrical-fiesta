import { Button, Card, Text, Stack, Group } from '@mantine/core';
import type { Plan } from '../types/plan';
import { SphereName } from '../constants/sphere';

const PlanCard = ({
  plan,
  onOpen,
  onDelete,
}: {
  plan: Plan;
  onOpen: (id: Plan['id']) => void;
  onDelete: (id: Plan['id']) => void;
}) => {
  return (
    <Card shadow="md" padding="lg" style={{ minWidth: 300 }}>
      <Stack gap="xs">
        <Text size="lg" fw={500}>
          План {SphereName[plan.type]}
        </Text>
        <Text size="sm" c="dimmed">
          Создан:{' '}
          {new Date(plan.createdAt).toLocaleDateString('ru-RU', {
            // Форматируем дату
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
        <Group grow>
          <Button onClick={() => onOpen(plan.id)}>Открыть</Button>
          <Button color="red" onClick={() => onDelete(plan.id)}>
            Удалить
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};

export default PlanCard;
