import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { useApp } from '../../context/AppContext';
import { toast } from 'sonner@2.0.3';
import { Plus, Trash2, UserCircle, Search } from 'lucide-react';

export function UserManagement() {
  const { users, addUser, currentUser } = useApp();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'cashier' as 'admin' | 'cashier',
  });

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (users.find(u => u.username === formData.username)) {
      toast.error('Username already exists');
      return;
    }

    addUser({
      username: formData.username,
      role: formData.role,
    });

    toast.success('User added successfully!');
    setFormData({ username: '', password: '', role: 'cashier' });
    setIsDialogOpen(false);
  };

  const handleDelete = (userId: string) => {
    if (userId === currentUser?.id) {
      toast.error('Cannot delete your own account');
      return;
    }
    
    if (confirm('Are you sure you want to delete this user?')) {
      toast.success('User deleted!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-2xl mb-4">User Management</h2>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input-background border-border"
            />
          </div>
        </div>
        {currentUser?.role === 'admin' && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-secondary">
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md bg-card border-border">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                    className="mt-2 bg-input-background border-border"
                  />
                </div>
                
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="mt-2 bg-input-background border-border"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    For demo purposes, all passwords are "password"
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select 
                    value={formData.role} 
                    onValueChange={(value: 'admin' | 'cashier') => setFormData({ ...formData, role: value })}
                  >
                    <SelectTrigger className="mt-2 bg-input-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="cashier">Cashier</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button type="submit" className="w-full bg-primary hover:bg-secondary">
                  Add User
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.length === 0 ? (
          <Card className="bg-card border-border md:col-span-2 lg:col-span-3">
            <CardContent className="p-12 text-center text-muted-foreground">
              {searchQuery ? 'No users found matching your search' : 'No users available'}
            </CardContent>
          </Card>
        ) : (
          filteredUsers.map((user) => (
          <Card key={user.id} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserCircle className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1">{user.username}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                      user.role === 'admin' 
                        ? 'bg-[#6F4E37]/10 text-[#6F4E37]' 
                        : 'bg-[#A47551]/10 text-[#A47551]'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                </div>
                {currentUser?.role === 'admin' && user.id !== currentUser.id && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-8 h-8"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                )}
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>Created: {new Date(user.createdAt).toLocaleDateString()}</p>
                {user.id === currentUser?.id && (
                  <p className="text-primary mt-1">(Current user)</p>
                )}
              </div>
            </CardContent>
          </Card>
          ))
        )}
      </div>
    </div>
  );
}
