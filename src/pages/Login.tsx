import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Globe, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const API_BASE = "https://langventure-api.onrender.com"; // backend base URL

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        const message = data?.error || data?.message || "Login failed";
        toast.error(message);
        setLoading(false);
        return;
      }

      // Expecting { token, user }
      const { token, user } = data;
      if (!token || !user) {
        toast.error("Unexpected response from server.");
        setLoading(false);
        return;
      }

      localStorage.setItem("langventure_token", token);
      localStorage.setItem("langventure_user", JSON.stringify(user));

      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error", err);
      toast.error("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    const demoUser = { name: "Demo Learner", email: "guest@demo.com", demo: true };
    localStorage.setItem("langventure_user", JSON.stringify(demoUser));
    toast.success("Welcome to the demo!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 glass-card shadow-elevated animate-scale-in">
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="flex items-center gap-2 mb-6 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transition-smooth group-hover:scale-110">
              <Globe className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              LangVenture
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to continue your adventure</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" aria-label="Login form">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
                aria-required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
                aria-required
              />
            </div>
          </div>

          <Button type="submit" className="w-full shadow-float" size="lg" disabled={loading} aria-busy={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <Button type="button" variant="outline" className="w-full" size="lg" onClick={handleGuestLogin}>
            Continue as Guest
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-primary hover:underline transition-smooth">
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
