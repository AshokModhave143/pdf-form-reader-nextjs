'use client';

import { NavLink, Stack } from '@mantine/core';

import './SideMenuNav.style.scss';
import { useState } from 'react';
import { SideMenuNavItem } from '../../../(pdf-processor)/_module/types/PdfProcessor.types';
import Link from 'next/link';

export interface SideMenuNavProps {
  menuItems: SideMenuNavItem[];
}
export const SideMenuNav = ({ menuItems }: SideMenuNavProps) => {
  const [active, setActive] = useState(0);

  const handleOnMenuClick = (index: number) => {
    setActive(index);
  };

  return (
    <Stack className="sideMenuNav">
      {menuItems?.map((item, index) => (
        <Link
          key={`menuitem-${item.label}-${index}`}
          href={item.href ?? '/'}
          suppressHydrationWarning
          suppressContentEditableWarning
          style={{
            textDecorationLine: 'none',
            textAnchor: 'middle',
            color: 'cyan',
          }}
        >
          <NavLink
            active={index === active}
            description={item.description}
            leftSection={item.icon}
            label={item.label}
            onClick={() => handleOnMenuClick(index)}
            color="cyan"
            variant="filled"
          />
        </Link>
      ))}
    </Stack>
  );
};
