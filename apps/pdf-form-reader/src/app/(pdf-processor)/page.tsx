import { Box, Button, Title } from '@mantine/core';

export default function Index() {
  return (
    <Box bg={'cyan'}>
      <Title order={1}>Welcome to My Nx Monorepo App</Title>
      <Button variant="outline" color="blue" size="lg">
        Get Started
      </Button>
    </Box>
  );
}
