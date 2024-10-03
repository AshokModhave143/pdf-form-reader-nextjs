import { SideMenuNavItem } from '../types/PdfProcessor.types';
import { TbHome2, TbSettings, TbGitCompare, TbDownload } from 'react-icons/tb';

export const sideMenuNavItems: SideMenuNavItem[] = [
  { icon: <TbHome2 size={30} color="cyan" />, label: 'Home', href: '/' },
  {
    icon: <TbGitCompare size={30} />,
    label: 'Review mappings',
    href: '/review-mappings',
  },
  {
    icon: <TbDownload size={30} />,
    label: 'Review Downloads',
    href: '/review-downloads',
  },
  { icon: <TbSettings size={30} />, label: 'Settings', href: '/settings' },
];
