'use client';

import { useState, useEffect } from 'react';
import { Button, Input, Sheet, Typography, List, ListItem, Box, FormControl, FormLabel } from '@mui/joy';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    const data = await res.json();
    setUsers(data);
  };

  const addUser = async () => {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });
    if (res.ok) {
      setName('');
      setEmail('');
      fetchUsers();
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography level="h1" sx={{ mb: 4 }}>User Management</Typography>
      <Sheet variant="outlined" sx={{ p: 3, mb: 4 }}>
        <Typography level="h2" sx={{ mb: 2 }}>Add User</Typography>
        <FormControl sx={{ mb: 2 }}>
          <FormLabel>Name</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl sx={{ mb: 2 }}>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <Button onClick={addUser}>Add User</Button>
      </Sheet>
      <Sheet variant="outlined" sx={{ p: 3 }}>
        <Typography level="h2" sx={{ mb: 2 }}>Users</Typography>
        <List>
          {users.map((user) => (
            <ListItem key={user.id}>
              {user.name} - {user.email}
            </ListItem>
          ))}
        </List>
      </Sheet>
    </Box>
  );
}
