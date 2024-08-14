import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/admin">Requested for Approval</Link></li>
        <li><Link to="/admin/users">Users</Link></li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
