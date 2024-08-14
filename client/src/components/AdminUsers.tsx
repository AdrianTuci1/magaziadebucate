import React, { useEffect, useState } from 'react';
import UserTable, { User } from './UserTable';

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch user data from API
    // Example: fetch('/api/users').then(response => response.json()).then(data => setUsers(data));
    // Dummy data for illustration
    setUsers([
      { id: '1', image: 'path/to/image1.jpg', name: 'User One', email: 'userone@example.com', role: 'user', blocked: false },
      { id: '2', image: 'path/to/image2.jpg', name: 'User Two', email: 'usertwo@example.com', role: 'admin', blocked: true },
    ]);
  }, []);

  const handleRoleChange = (userId: string, newRole: string) => {
    // Handle role change logic here
    console.log(`Change role of user ${userId} to ${newRole}`);
  };

  const handleBlockToggle = (userId: string) => {
    // Handle block/unblock logic here
    console.log(`Toggle block status of user ${userId}`);
  };

  const handleSendMessage = (userId: string) => {
    // Handle send message logic here
    console.log(`Send message to user ${userId}`);
  };

  return (
    <div>
      <h1>All Users</h1>
      <UserTable 
        users={users} 
        onRoleChange={handleRoleChange} 
        onBlockToggle={handleBlockToggle} 
        onSendMessage={handleSendMessage} 
      />
    </div>
  );
};

export default AdminUsers;
