import React, { useState } from "react";
import CardComp from "./Card";
import Navbar from "./Navbar";
import { DataTableDemo } from "./LeaderBoard";
import CreateTest2 from "./CreateTest2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { CalendarIcon, ChartBarIcon, UsersIcon, PlusCircleIcon, BookIcon } from "lucide-react";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage tests, view statistics, and track performance.</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <ChartBarIcon size={16} />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="tests" className="flex items-center gap-2">
              <BookIcon size={16} />
              Manage Tests
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <PlusCircleIcon size={16} />
              Create Test
            </TabsTrigger>
          </TabsList>
          
          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="overflow-hidden border-none shadow-md transition-all hover:shadow-lg">
                  <CardHeader className="bg-blue-50 dark:bg-blue-900/20 pb-2">
                    <CardDescription>Total Tests</CardDescription>
                    <CardTitle className="text-3xl font-bold text-blue-700 dark:text-blue-400">2,563</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">This month</span>
                      <span className="text-sm font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full">
                        +21%
                      </span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden border-none shadow-md transition-all hover:shadow-lg">
                  <CardHeader className="bg-green-50 dark:bg-green-900/20 pb-2">
                    <CardDescription>Active Users</CardDescription>
                    <CardTitle className="text-3xl font-bold text-green-700 dark:text-green-400">1,845</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">This month</span>
                      <span className="text-sm font-medium bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">
                        +15%
                      </span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden border-none shadow-md transition-all hover:shadow-lg">
                  <CardHeader className="bg-purple-50 dark:bg-purple-900/20 pb-2">
                    <CardDescription>Total Referrals</CardDescription>
                    <CardTitle className="text-3xl font-bold text-purple-700 dark:text-purple-400">836</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">This month</span>
                      <span className="text-sm font-medium bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 px-2 py-1 rounded-full">
                        +8%
                      </span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden border-none shadow-md transition-all hover:shadow-lg">
                  <CardHeader className="bg-amber-50 dark:bg-amber-900/20 pb-2">
                    <CardDescription>Avg Completion Time</CardDescription>
                    <CardTitle className="text-3xl font-bold text-amber-700 dark:text-amber-400">24m</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">This month</span>
                      <span className="text-sm font-medium bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-full">
                        -5%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Leaderboard */}
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-bold">Recent Leaderboard</CardTitle>
                  <CardDescription>Top performers from the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTableDemo />
                </CardContent>
              </Card>
              
              {/* Recent Activity */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none shadow-md md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Recent Tests</CardTitle>
                    <CardDescription>Latest tests created or modified</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                          <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                            <BookIcon size={20} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">Advanced JavaScript Test {i}</h4>
                            <p className="text-sm text-gray-500">Modified {i} day{i > 1 ? 's' : ''} ago</p>
                          </div>
                          <div className="text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full">
                            {['Active', 'Draft', 'Completed'][i-1]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-none shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">User Activity</CardTitle>
                    <CardDescription>Today's active users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium">
                            {['JD', 'AS', 'MK', 'TP'][i-1]}
                          </div>
                          <div>
                            <h4 className="font-medium">{['John Doe', 'Alice Smith', 'Mark Kim', 'Tom Parker'][i-1]}</h4>
                            <p className="text-xs text-gray-500">Completed {i} test{i > 1 ? 's' : ''}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Tests Tab */}
          <TabsContent value="tests">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Test Management</CardTitle>
                <CardDescription>View and manage your existing tests</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-gray-500">
                  Your test management interface would go here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Create Test Tab */}
          <TabsContent value="create">
            <CreateTest2 />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AdminDashboard;
