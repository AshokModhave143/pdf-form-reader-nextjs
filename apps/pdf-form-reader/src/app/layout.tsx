import '@mantine/core/styles.css';
import './global.css';
import { unstable_noStore as noStore } from 'next/cache';
import { AppRoot } from './_common/components/AppRoot';
import { sideMenuNavItems } from './(pdf-processor)/_module/constants/SideMenuItems';

export const metadata = {
  title: 'Welcome to pdf-form-reader',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  noStore();

  return (
    <html lang="en">
      <body>
        <AppRoot menuItems={sideMenuNavItems}>{children}</AppRoot>
      </body>
    </html>
  );
}
