import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../UserDashboard/UserNavbar';
import CardComp from './Card';
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, FileText, Award, TrendingUp, PlusCircle } from 'lucide-react';

// Sample data for charts
const userData = [
  { name: 'Jan', total: 12 },
  { name: 'Feb', total: 18 },
  { name: 'Mar', total: 25 },
  { name: 'Apr', total: 20 },
  { name: 'May', total: 32 },
  { name: 'Jun', total: 45 },
  { name: 'Jul', total: 55 },
];

const testCompletionData = [
  { name: 'Completed', value: 540 },
  { name: 'Abandoned', value: 80 },
  { name: 'In Progress', value: 45 },
];

const COLORS = ['#0088FE', '#FF8042', '#FFBB28'];

const testTrendData = [
  { name: 'Week 1', attempts: 40, completions: 32 },
  { name: 'Week 2', attempts: 30, completions: 25 },
  { name: 'Week 3', attempts: 55, completions: 49 },
  { name: 'Week 4', attempts: 70, completions: 62 },
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Navigation handlers
  const handleCreateTest = () => {
    navigate('/admin/tests/create');
  };

  const handleViewUsers = () => {
    navigate('/admin/users');
  };

  const handleManageTests = () => {
    navigate('/admin/tests');
  };

  const handleViewResults = () => {
    navigate('/admin/results');
  };

  const handleViewPerformance = () => {
    navigate('/admin/performance');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <UserNavbar username={user?.name} />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col gap-6">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            
            {/* Create Test Button */}
            <Button 
              onClick={handleCreateTest}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 self-start md:self-auto"
            >
              <PlusCircle size={18} />
              Create Test
            </Button>
          </div>

          {/* Welcome Message */}
          <div className="text-sm text-gray-500 dark:text-gray-400 -mt-4">
            Welcome back, {user?.name}. Here's an overview of your platform.
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CardComp 
              title="Total Users"
              description="Active platform users"
              value="125"
              buttonText="View All Users"
              icon={<Users className="h-6 w-6 text-blue-600" />}
              onClick={handleViewUsers}
            />
            
            <CardComp 
              title="Total Tests"
              description="Available tests"
              value="28"
              buttonText="Manage Tests"
              icon={<BookOpen className="h-6 w-6 text-green-600" />}
              onClick={handleManageTests}
            />
            
            <CardComp 
              title="Submissions"
              description="Total test attempts"
              value="831"
              buttonText="View Results"
              icon={<FileText className="h-6 w-6 text-purple-600" />}
              onClick={handleViewResults}
            />

            <CardComp 
              title="Avg. Score"
              description="Overall performance"
              value="76%"
              buttonText="Performance"
              icon={<Award className="h-6 w-6 text-yellow-600" />}
              onClick={handleViewPerformance}
            />
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="overview" className="w-full mt-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users" onClick={() => navigate('/admin/users')}>Users</TabsTrigger>
              <TabsTrigger value="tests" onClick={() => navigate('/admin/tests')}>Tests</TabsTrigger>
            </TabsList>

            {/* Overview Tab Content */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User Growth Chart */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-medium">User Growth</CardTitle>
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                    </div>
                    <CardDescription>New user registrations over time</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={userData}>
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Bar dataKey="total" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Test Completion Status */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-medium">Test Completion Status</CardTitle>
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    <CardDescription>Distribution of test completion states</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <div className="w-full h-[300px] flex items-center justify-center">
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={testCompletionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={90}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {testCompletionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Test Attempts vs Completions */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-medium">Test Attempts vs. Completions</CardTitle>
                    <Award className="h-5 w-5 text-yellow-600" />
                  </div>
                  <CardDescription>Weekly test engagement metrics</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={testTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="attempts" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="completions" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab Content */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>View and manage platform users</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    User management interface will be implemented here. Currently in development.
                  </p>
                  <Button 
                    className="mt-4 bg-blue-600" 
                    onClick={() => navigate('/admin/users')}
                  >
                    Go to Full User Management
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tests Tab Content */}
            <TabsContent value="tests">
              <Card>
                <CardHeader>
                  <CardTitle>Test Management</CardTitle>
                  <CardDescription>Create and manage quiz tests</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Test management interface will be implemented here. Currently in development.
                  </p>
                  <div className="flex gap-4 mt-4">
                    <Button 
                      className="bg-blue-600" 
                      onClick={() => navigate('/admin/tests')}
                    >
                      View All Tests
                    </Button>
                    <Button 
                      className="bg-green-600" 
                      onClick={handleCreateTest}
                    >
                      Create New Test
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
