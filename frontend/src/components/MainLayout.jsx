import HeaderBar from './HeaderBar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => (
  <div>
    <HeaderBar />
    <Outlet />
  </div>
);

export default MainLayout;