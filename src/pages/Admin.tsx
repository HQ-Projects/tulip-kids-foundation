
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdminPanel from '../components/AdminPanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check against hardcoded credentials
<<<<<<< HEAD
    if (email === import.meta.env.VITE_ADMIN_EMAIL && password === import.meta.env.VITE_ADMIN_PASSWORD) {
=======
    if (email === 'tulipkids0@gmail.com' && password === 'Tulipkids@2025') {
>>>>>>> ffda60f784b53587f363a5f68a17b0e0ffd6809b
      setAuthenticated(true);
      toast("Logged in successfully", {
        description: "Welcome to the admin panel",
      });
    } else {
      toast("Invalid credentials", {
        description: "Please try again with the correct email and password",
      });
    }
  };
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 bg-gradient-to-b from-background to-secondary/30">
      {!authenticated ? (
        <motion.div 
          className="max-w-md mx-auto mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="rounded-xl overflow-hidden shadow-medium">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pr-10 rounded-xl h-12"
                    />
                  </div>
                  <div className="relative">
                    <Input
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10 rounded-xl h-12"
                    />
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Use the credentials provided by your administrator.
                  </p>
                </div>
                
                <Button type="submit" className="w-full rounded-xl h-12 btn-hover-effect">
                  Login to Admin Panel
                </Button>
                
                <div className="text-center">
                  <a href="/" className="text-sm text-primary hover:text-primary/80 transition-colors">
                    Return to registration
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <AdminPanel />
      )}
    </div>
  );
};

export default Admin;
