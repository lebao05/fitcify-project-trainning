import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import './AdminLayout.scss';

const AdminLayout = () => (
  <div className="admin-layout">
    <AdminSidebar />
    <div className="admin-content">
      <Outlet />
    </div>
  </div>
);

export default AdminLayout;
