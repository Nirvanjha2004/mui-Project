import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { BookOpen, EyeIcon, EyeOffIcon, ArrowRight, CheckCircle, Loader, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { register, error } = useAuth();

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '' };
    if (password.length < 6) return { strength: 1, label: 'Weak' };
    if (password.length < 10) return { strength: 2, label: 'Medium' };
    if (password.length >= 10) return { strength: 3, label: 'Strong' };
    return { strength: 0, label: '' };
  };

  const passwordStrength = getPasswordStrength(password);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!name || !email || !password) {
      setFormError('All fields are required');
      return;
    }
    
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters long');
      return;
    }
    
    if (!agreeToTerms) {
      setFormError('You must agree to the terms of service');
      return;
    }
    
    setFormError(null);
    setIsSubmitting(true);
    
    try {
      await register(name, email, password, role);
      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setFormError(err.response?.data?.message || 'Failed to register. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center">
            <BookOpen className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl font-bold ml-2">QuizMaster</h1>
          </div>
        </div>
        
        <Card className="border-none shadow-lg">
          <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
              <CardDescription className="text-center">
                Enter your information to create your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Error message */}
              {(formError || error) && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>
                    {formError || error}
                  </AlertDescription>
                </Alert>
              )}
              
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11"
                />
              </div>
              
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  className="h-11"
                />
              </div>
              
              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pr-10"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                  </button>
                </div>
                
                {/* Password strength indicator */}
                {password && (
                  <div className="mt-2">
                    <div className="flex gap-1 h-1">
                      <div className={`flex-1 rounded-full ${passwordStrength.strength >= 1 ? 'bg-red-400' : 'bg-gray-200'}`}></div>
                      <div className={`flex-1 rounded-full ${passwordStrength.strength >= 2 ? 'bg-yellow-400' : 'bg-gray-200'}`}></div>
                      <div className={`flex-1 rounded-full ${passwordStrength.strength >= 3 ? 'bg-green-400' : 'bg-gray-200'}`}></div>
                    </div>
                    <p className={`text-xs mt-1 ${
                      passwordStrength.strength === 1 ? 'text-red-500' : 
                      passwordStrength.strength === 2 ? 'text-yellow-600' : 
                      passwordStrength.strength === 3 ? 'text-green-500' : ''
                    }`}>
                      {passwordStrength.label}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Role Selection */}
              <div className="space-y-2">
                <Label>Account Type</Label>
                <RadioGroup 
                  defaultValue="user" 
                  value={role}
                  onValueChange={(value) => setRole(value as 'user' | 'admin')}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="user" id="user-role" />
                    <Label htmlFor="user-role" className="cursor-pointer">User</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin-role" />
                    <Label htmlFor="admin-role" className="cursor-pointer flex items-center">
                      <ShieldAlert className="h-4 w-4 mr-1 text-amber-500" />
                      Admin
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              {/* Terms and Conditions */}
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    terms of service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    privacy policy
                  </a>
                </label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full h-11 text-base bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Loader size={18} className="animate-spin" />
                    Creating account...
                  </div>
                ) : "Create account"}
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/signin" className="text-blue-600 hover:underline font-medium">
                  Sign in
                </a>
              </div>
            </CardFooter>
          </form>
        </Card>
        
        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Free Practice Tests</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Performance Analytics</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Personalized Learning</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;