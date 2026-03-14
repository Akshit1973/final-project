import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { HeroPage } from './pages/HeroPage';
import { DashboardPage } from './pages/DashboardPage';
import { ExplorePage } from './pages/ExplorePage';
import { AchievementsPage } from './pages/AchievementsPage';
import { LoginPage } from './pages/LoginPage';
import { SupportPage } from './pages/SupportPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HeroPage },
      { path: 'dashboard', Component: DashboardPage },
      { path: 'explore', Component: ExplorePage },
      { path: 'achievements', Component: AchievementsPage },
      { path: 'support', Component: SupportPage },
    ],
  },
  {
    path: '/login',
    Component: LoginPage,
  },
]);