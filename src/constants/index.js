import { createCampaign, dashboard, logout, payment, profile, withdraw, connect } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'create campaign',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'withdraw',
    imgUrl: withdraw,
    link: '/withdraw',
  },
  // {
  //   name: 'logout',
  //   imgUrl: connect,
  // },
];
