import { Box, Container, Text } from '@mantine/core';
import { PiFilePdfFill } from 'react-icons/pi';
import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <Container
        fluid
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: 'black',
        }}
      >
        <Box
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <PiFilePdfFill size={50} fill={'cyan'} />
          <Text
            size="xl"
            fw={900}
            py={30}
            variant="gradient"
            gradient={{ from: 'grape', to: 'cyan', deg: 90 }}
          >
            PDF Processor
          </Text>
        </Box>
      </Container>
    </header>
  );
};
