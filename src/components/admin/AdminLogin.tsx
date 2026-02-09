import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Coffee } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function AdminLogin() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = login(formData.username, formData.password);
    
    if (success) {
      toast.success('Login berhasil!');
      navigate('/admin');
    } else {
      toast.error('Kredensial tidak valid');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md bg-card border-border">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Coffee className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl mb-2">Login Admin</h1>
            <p className="text-muted-foreground text-sm">Masuk untuk mengakses panel admin</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Masukkan username"
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
                placeholder="Masukkan password"
                required
                className="mt-2 bg-input-background border-border"
              />
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-secondary" size="lg">
              Masuk
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button variant="link" onClick={() => navigate('/')}>
              Back to Website
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
