import { Container, createTheme, MantineProvider } from '@mantine/core';
import { Header } from '../Header';
import './AppRoot.style.scss';
import { SideMenuNav } from '../SideMenuNav';
import { SideMenuNavItem } from '../../../(pdf-processor)/_module/types/PdfProcessor.types';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
});

export const AppRoot = ({
  children,
  menuItems,
}: {
  children: React.ReactNode;
  menuItems: SideMenuNavItem[];
}) => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <div className="row">
        <Header />
        <div
          style={{
            float: 'left',
            width: '25%',
            backgroundColor: 'Background',
            height: '100vh',
          }}
        >
          <SideMenuNav menuItems={menuItems} />
        </div>
        <div style={{ float: 'left', width: '75%', height: '100vh' }}>
          <Container fluid>{children}</Container>
        </div>
      </div>
    </MantineProvider>
  );
};
