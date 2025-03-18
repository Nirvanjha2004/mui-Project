import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { 
  Bell, 
  BookOpen, 
  Calendar, 
  ChevronRight, 
  Clock, 
  FileText, 
  Flame,
  Medal,
  BarChart3,
  Trophy,
  BookMarked
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New test available: Advanced JavaScript", time: "5 minutes ago", unread: true },
    { id: 2, message: "Your score for Python Basics: 92/100", time: "2 hours ago", unread: true },
    { id: 3, message: "Weekly challenge deadline tomorrow", time: "1 day ago", unread: false },
  ]);
  
  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const liveTests = [
    { 
      id: 1, 
      title: "JavaScript Fundamentals", 
      duration: "45 min", 
      questions: 25, 
      difficulty: "Intermediate",
      dueDate: "Today",
      tags: ["frontend", "programming"]
    },
    { 
      id: 2, 
      title: "React Components & Hooks", 
      duration: "60 min", 
      questions: 30, 
      difficulty: "Advanced",
      dueDate: "2 days",
      tags: ["frontend", "react"]
    },
    { 
      id: 3, 
      title: "API Integration Basics", 
      duration: "30 min", 
      questions: 20, 
      difficulty: "Beginner",
      dueDate: "5 days",
      tags: ["backend", "api"]
    },
  ];

  const recentTests = [
    { id: 1, title: "HTML & CSS Basics", score: 95, date: "Mar 10, 2025", badge: "Perfect!" },
    { id: 2, title: "Database Fundamentals", score: 87, date: "Mar 7, 2025", badge: "Good" },
    { id: 3, title: "Git & Version Control", score: 78, date: "Mar 3, 2025", badge: "Passed" },
  ];

  const leaderboardData = [
    { rank: 1, name: "Sarah Miller", avatar: "SM", score: 98, tests: 12 },
    { rank: 2, name: "James Wilson", avatar: "JW", score: 96, tests: 15 },
    { rank: 3, name: "Ken Thompson", avatar: "KT", score: 94, tests: 11 },
    { rank: 4, name: "Alex Parker", avatar: "AP", score: 92, tests: 14 },
    { rank: 5, name: "You", avatar: "YO", score: 90, tests: 10, isCurrentUser: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <header className="sticky top-0 z-30 w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">QuizMaster</h3>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell size={18} />
                    {notifications.some(n => n.unread) && (
                      <span className="absolute top-1 right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel className="flex justify-between items-center">
                    <span>Notifications</span>
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-blue-600" onClick={markAllRead}>
                      Mark all read
                    </Button>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.map(notification => (
                    <DropdownMenuItem key={notification.id} className={`cursor-pointer flex flex-col items-start p-3 ${notification.unread ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}>
                      <div className="flex items-start gap-2">
                        {notification.unread && <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />}
                        <div>
                          <p className="font-medium">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/assets/avatars/user.png" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline-flex text-sm font-medium">John Doe</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>My Results</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500">Log Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* User welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, John!</h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your tests and progress.</p>
        </div>

        {/* Main tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 size={16} />
              Overview
            </TabsTrigger>
            <TabsTrigger value="tests" className="flex items-center gap-2">
              <BookMarked size={16} />
              Available Tests
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Trophy size={16} />
              Leaderboards
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="overflow-hidden border-none shadow-md transition-all hover:shadow-lg">
                <CardHeader className="bg-blue-50 dark:bg-blue-900/20 pb-2">
                  <CardDescription>Tests Completed</CardDescription>
                  <CardTitle className="text-3xl font-bold text-blue-700 dark:text-blue-400">10</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">This month</span>
                    <span className="text-sm font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full">
                      +2
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden border-none shadow-md transition-all hover:shadow-lg">
                <CardHeader className="bg-green-50 dark:bg-green-900/20 pb-2">
                  <CardDescription>Avg. Score</CardDescription>
                  <CardTitle className="text-3xl font-bold text-green-700 dark:text-green-400">87%</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Last 30 days</span>
                    <span className="text-sm font-medium bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">
                      +5%
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden border-none shadow-md transition-all hover:shadow-lg">
                <CardHeader className="bg-purple-50 dark:bg-purple-900/20 pb-2">
                  <CardDescription>Current Rank</CardDescription>
                  <CardTitle className="text-3xl font-bold text-purple-700 dark:text-purple-400">5</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Overall</span>
                    <span className="text-sm font-medium bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 px-2 py-1 rounded-full">
                      +2
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden border-none shadow-md transition-all hover:shadow-lg">
                <CardHeader className="bg-amber-50 dark:bg-amber-900/20 pb-2">
                  <CardDescription>Pending Tests</CardDescription>
                  <CardTitle className="text-3xl font-bold text-amber-700 dark:text-amber-400">3</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Due soon</span>
                    <Button variant="link" className="p-0 h-auto text-amber-600 font-medium text-sm">View all</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent activities and live tests */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Live Tests - Left side */}
              <Card className="md:col-span-2 border-none shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-xl">Live Tests</CardTitle>
                    <CardDescription>Tests that are currently available</CardDescription>
                  </div>
                  <Badge variant="outline" className="font-medium">
                    {liveTests.length} Active
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-5">
                  {liveTests.map((test) => (
                    <div key={test.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-100 dark:border-gray-800">
                      <div className="flex flex-col mb-3 sm:mb-0">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-md mr-3 ${
                            test.difficulty === "Beginner" ? "bg-green-100 text-green-700" : 
                            test.difficulty === "Intermediate" ? "bg-blue-100 text-blue-700" : 
                            "bg-purple-100 text-purple-700"
                          }`}>
                            <FileText size={16} />
                          </div>
                          <div>
                            <h4 className="font-medium">{test.title}</h4>
                            <div className="flex items-center gap-4 mt-1">
                              <div className="flex items-center text-xs text-gray-500">
                                <Clock size={12} className="mr-1" />
                                {test.duration}
                              </div>
                              <div className="flex items-center text-xs text-gray-500">
                                <FileText size={12} className="mr-1" />
                                {test.questions} Questions
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-5">
                        <div className="flex items-center">
                          <Calendar size={14} className="text-gray-500 mr-1" />
                          <span className="text-xs font-medium">Due: {test.dueDate}</span>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700">Take Test</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="flex justify-center border-t pt-4">
                  <Button variant="outline" className="flex items-center gap-1">
                    View All Tests
                    <ChevronRight size={16} />
                  </Button>
                </CardFooter>
              </Card>

              {/* Recent Tests Results - Right side */}
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Your Recent Results</CardTitle>
                  <CardDescription>Last 3 tests you've completed</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentTests.map((test) => (
                    <div key={test.id} className="flex flex-col space-y-3 border-b pb-3 last:border-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{test.title}</h4>
                        <Badge variant={
                          test.score >= 90 ? "default" : 
                          test.score >= 80 ? "outline" : 
                          "secondary"
                        }>
                          {test.badge}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              test.score >= 90 ? "bg-green-500" : 
                              test.score >= 80 ? "bg-blue-500" : 
                              test.score >= 70 ? "bg-amber-500" : 
                              "bg-red-500"
                            }`}
                            style={{ width: `${test.score}%` }}
                          ></div>
                        </div>
                        <span className="font-medium text-sm">{test.score}%</span>
                      </div>
                      <div className="text-xs text-gray-500">{test.date}</div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="flex justify-center border-t pt-4">
                  <Button variant="ghost" className="flex items-center gap-1">
                    View All Results
                    <ChevronRight size={16} />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Tests Tab */}
          <TabsContent value="tests">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Available Tests</CardTitle>
                <CardDescription>All tests that you can currently take</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...liveTests, ...liveTests].slice(0, 6).map((test, index) => (
                    <Card key={`${test.id}-${index}`} className="overflow-hidden border border-gray-200 dark:border-gray-700">
                      <CardHeader className={`pb-3 ${
                        test.difficulty === "Beginner" ? "bg-green-50 dark:bg-green-900/10" : 
                        test.difficulty === "Intermediate" ? "bg-blue-50 dark:bg-blue-900/10" : 
                        "bg-purple-50 dark:bg-purple-900/10"
                      }`}>
                        <div className="flex justify-between">
                          <Badge variant="outline">{test.difficulty}</Badge>
                          {index % 3 === 0 && <Badge className="bg-red-500">New!</Badge>}
                        </div>
                        <CardTitle className="text-lg mt-2">{test.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock size={14} className="mr-1" />
                              {test.duration}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <FileText size={14} className="mr-1" />
                              {test.questions} Questions
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {test.tags.map((tag, i) => (
                              <Badge key={i} variant="outline" className="text-xs bg-gray-50">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t">
                        <Button className="w-full">Start Test</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4">
                <Button variant="outline">Load More Tests</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Monthly Leaderboard</CardTitle>
                <CardDescription>Top performers for this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboardData.map((user) => (
                    <div 
                      key={user.rank} 
                      className={`flex items-center p-3 rounded-md ${
                        user.isCurrentUser ? "bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800" : 
                        user.rank === 1 ? "bg-amber-50 dark:bg-amber-900/10" :
                        ""
                      }`}
                    >
                      {/* Rank */}
                      <div className="w-10 mr-4">
                        {user.rank <= 3 ? (
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            user.rank === 1 ? "bg-amber-100 text-amber-800 border border-amber-300" :
                            user.rank === 2 ? "bg-gray-100 text-gray-800 border border-gray-300" :
                            "bg-orange-100 text-orange-800 border border-orange-300"
                          }`}>
                            {user.rank}
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            {user.rank}
                          </div>
                        )}
                      </div>
                      
                      {/* User info */}
                      <div className="flex flex-1 items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarFallback className={user.isCurrentUser ? "bg-blue-200 text-blue-800" : ""}>{user.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.tests} tests completed</div>
                        </div>
                      </div>
                      
                      {/* Score */}
                      <div className="flex items-center">
                        {user.rank === 1 && <Medal className="text-amber-500 mr-2" size={18} />}
                        <Badge variant={user.rank <= 3 ? "default" : "outline"} className="font-medium">
                          {user.score}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="text-sm text-gray-500">
                  Your position: <span className="font-medium text-blue-600">5th</span> out of 120 users
                </div>
                <Button variant="outline" size="sm">View Full Rankings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default UserDashboard;