import React from 'react';

export interface User {
  id: string;
  image: string;
  name: string;
  email: string;
  role: string;
  blocked: boolean;
}

interface UserTableProps {
  users: User[];
  onRoleChange: (userId: string, newRole: string) => void;
  onBlockToggle: (userId: string) => void;
  onSendMessage: (userId: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onRoleChange, onBlockToggle, onSendMessage }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>User Image</th>
          <th>User Name</th>
          <th>User Email</th>
          <th>User Role</th>
          <th>Block/Unblock</th>
          <th>Send Message</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td><img src={user.image} alt={user.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} /></td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <select value={user.role} onChange={e => onRoleChange(user.id, e.target.value)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
              </select>
            </td>
            <td>
              <button onClick={() => onBlockToggle(user.id)}>
                {user.blocked ? 'Unblock' : 'Block'}
              </button>
            </td>
            <td>
              <button onClick={() => onSendMessage(user.id)}>Send Message</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
