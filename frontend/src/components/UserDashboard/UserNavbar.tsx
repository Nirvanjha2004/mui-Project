import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import {
  Search,
  Bell,
  Menu,
  X,
  ChevronDown,
  Moon,
  Sun,
  User,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  Book,
  Home,
  BarChart2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import { Link } from "react-router-dom";

interface UserNavbarProps {
  username?: string;
}

function UserNavbar({ username = "User" }: UserNavbarProps) {
  const [theme, setTheme] = useState("light");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    // Implement actual theme switching logic here
  };

  const unreadNotifications = 3;

  const navLinks = [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "My Tests", icon: Book, href: "/my-tests" },
    { label: "Results", icon: FileText, href: "/results" },
    { label: "Leaderboard", icon: BarChart2, href: "/leaderboard" },
  ];

  return (
    <nav className="sticky top-0 z-30 w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and mobile menu */}
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden mr-2">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="flex flex-col h-full">
                  <div className="flex items-center px-4 py-2 mb-6">
                    <Book className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                    <span className="text-lg font-semibold">QuizMaster</span>
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    {navLinks.map((link, i) => (
                      <Link 
                        key={i} 
                        to={link.href}
                        className="flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <link.icon className="mr-3 h-5 w-5 text-gray-500" />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mt-6">
                    <Link 
                      to="/profile"
                      className="flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <User className="mr-3 h-5 w-5 text-gray-500" />
                      My Profile
                    </Link>
                    <Link 
                      to="/settings"
                      className="flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Settings className="mr-3 h-5 w-5 text-gray-500" />
                      Settings
                    </Link>
                    <button 
                      className="flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left text-red-500"
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      Log Out
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            <Link to="/dashboard" className="flex items-center">
              <Book className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-lg font-semibold hidden sm:inline-block">QuizMaster</span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, i) => (
              <Link 
                key={i} 
                to={link.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search bar - hidden on smaller screens */}
          <div className="hidden lg:flex flex-1 max-w-sm mx-6">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <input
                type="search"
                placeholder="Search tests..."
                className="w-full bg-gray-100 dark:bg-gray-700 pl-9 pr-4 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-300"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell size={18} />
                  {unreadNotifications > 0 && (
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
                  <Badge variant="outline" className="font-normal">
                    {unreadNotifications} new
                  </Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-y-auto">
                  <DropdownMenuItem className="p-3 cursor-pointer flex flex-col items-start bg-blue-50 dark:bg-blue-900/10">
                    <div className="font-medium">New test available: React Advanced</div>
                    <div className="text-xs text-gray-500 mt-1">5 minutes ago</div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 cursor-pointer flex flex-col items-start bg-blue-50 dark:bg-blue-900/10">
                    <div className="font-medium">Your score for JavaScript Basics: 92/100</div>
                    <div className="text-xs text-gray-500 mt-1">2 hours ago</div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 cursor-pointer flex flex-col items-start">
                    <div className="font-medium">Weekly challenge deadline tomorrow</div>
                    <div className="text-xs text-gray-500 mt-1">1 day ago</div>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-2 cursor-pointer flex justify-center text-blue-600 font-medium">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/assets/avatars/user.jpg" alt="User" />
                    <AvatarFallback className="bg-blue-100 text-blue-800">{username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-flex text-sm font-medium">{username}</span>
                  <ChevronDown size={16} className="opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>My Results</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;