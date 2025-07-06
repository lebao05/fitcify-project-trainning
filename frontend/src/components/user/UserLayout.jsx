import HeaderBar from '../HeaderBar';
import { Outlet } from 'react-router-dom';

const UserLayout = () => (
  <div>
    <HeaderBar />
    <Outlet />
  </div>
);

export default UserLayout;