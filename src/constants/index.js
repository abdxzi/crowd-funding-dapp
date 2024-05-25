import { createCampaign, dashboard, logout, payment, profile, withdraw, settings } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
  {
    name: 'withdraw',
    imgUrl: withdraw,
    link: '/',
    disabled: true,
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'settings',
    imgUrl: settings,
    // link: '/',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
    // disabled: true,
  },
];
