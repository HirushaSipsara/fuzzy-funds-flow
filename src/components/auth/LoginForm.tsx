import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuthStore } from '@/stores/authStore';
import { toast } from '@/hooks/use-toast';
import { Heart, ShoppingBag } from 'lucide-react';
import heroTeddy from '@/assets/hero-teddy.jpg';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login({ username, password });
      if (success) {
        toast({
          title: "Welcome back! 🧸",
          description: "Successfully logged into TeddyPOS",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Hero Section */}
        <div className="hidden lg:flex flex-col items-center space-y-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Heart className="h-8 w-8 text-primary animate-bounce-soft" />
              <h1 className="text-5xl font-display font-bold text-foreground">TeddyPOS</h1>
              <ShoppingBag className="h-8 w-8 text-primary animate-wiggle" />
            </div>
            <p className="text-xl text-muted-foreground font-body">
              The cutest point of sale system for your teddy bear store
            </p>
          </div>
          <div className="relative">
            <img 
              src={heroTeddy} 
              alt="Cute teddy bear mascot" 
              className="w-96 h-72 object-cover rounded-3xl shadow-glow animate-float"
            />
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center shadow-soft animate-bounce-soft">
              🧸
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md shadow-glow border-2 border-primary/20">
            <CardHeader className="text-center space-y-2">
              <div className="flex justify-center lg:hidden mb-4">
                <div className="flex items-center space-x-2">
                  <Heart className="h-6 w-6 text-primary" />
                  <h1 className="text-3xl font-display font-bold text-foreground">TeddyPOS</h1>
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-display">Welcome Back!</CardTitle>
              <CardDescription>
                Sign in to access your teddy bear store system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="h-12"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  variant="cute"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In 🧸"}
                </Button>
              </form>
              
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Demo Credentials:</p>
                <div className="space-y-1 text-xs">
                  <p><strong>Admin:</strong> username: admin, password: password</p>
                  <p><strong>Cashier:</strong> username: cashier, password: password</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};