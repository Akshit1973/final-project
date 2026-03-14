import { Outlet } from 'react-router';
import { Navbar } from './Navbar';

export function Layout() {
  return (
    <div
      style={{
        background: '#010409',
        minHeight: '100vh',
        color: '#E6EDF3',
        fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
      }}
    >
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
