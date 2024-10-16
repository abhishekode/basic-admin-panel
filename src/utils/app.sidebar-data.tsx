import { FaUser } from 'react-icons/fa';
import { LuPieChart } from 'react-icons/lu';

export const links = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    pathnameInclude: 'dashboard',
    icon: <LuPieChart className='text-xl' />,
  },
  {
    title: 'Users',
    path: '/user/',
    pathnameInclude: 'user',
    subLinks: [
      { title: 'Admin', path: '/user/admin/list' },
      { title: 'Users', path: '/user/list' },
    ],
    icon: <FaUser className='text-xl'/>,
  },
  
 
];
