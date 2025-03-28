import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { BookOpen, EyeIcon, EyeOffIcon, ArrowRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '' };
    if (password.length < 6) return { strength: 1, label: 'Weak' };
    if (password.length < 10) return { strength: 2, label: 'Medium' };
    if (password.length >= 10) return { strength: 3, label: 'Strong' };
    return { strength: 0, label: '' };
  };

  const navigate = useNavigate();

  const passwordStrength = getPasswordStrength(password);
  
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
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Enter your information to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
            
            {/* Terms and Conditions */}
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
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
            <Button className="w-full h-11 text-base bg-blue-600 hover:bg-blue-700">
              Create account
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <a href="/signin" className="text-blue-600 hover:underline font-medium">
                Sign in
              </a>
            </div>
          </CardFooter>
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