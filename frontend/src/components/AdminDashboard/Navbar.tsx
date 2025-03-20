import React from "react";
import { Button } from "../ui/button";
import { Search, Bell, ChevronDown, PlusCircle, Menu, Moon, Sun } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { 
  User, 
  GraduationCap, 
  Code, 
  Award, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Github, 
  Linkedin, 
  Globe, 
  Twitter 
} from "lucide-react";
import Navbar from "../AdminDashboard/Navbar";

function UserProfile() {
  const userData = {
    personal: {
      name: "John Doe",
      title: "Frontend Developer",
      email: "john.doe@example.com",
      phone: "+1 (555) 987-6543",
      location: "New York, NY",
      bio: "Passionate frontend developer with a knack for creating intuitive and responsive user interfaces. Loves solving coding challenges and contributing to open-source projects.",
      avatar: "/assets/avatars/user.jpg"
    },
    education: [
      {
        id: 1,
        institution: "New York University",
        degree: "Bachelor of Science in Computer Science",
        year: "2016-2020",
        description: "Focused on web development and user experience design."
      }
    ],
    codingProfiles: [
      { id: 1, platform: "GitHub", username: "johndoe", url: "https://github.com/johndoe", contributions: "300+ contributions in last year" },
      { id: 2, platform: "LeetCode", username: "john_doe", url: "https://leetcode.com/john_doe", stats: "Solved 500+ problems" },
      { id: 3, platform: "HackerRank", username: "john_doe", url: "https://hackerrank.com/john_doe", badges: "5-star algorithm badge" },
    ],
    skills: [
      "HTML", "CSS", "JavaScript", "React", "TypeScript", "Redux", 
      "Tailwind CSS", "Node.js", "Git", "REST APIs", "Responsive Design"
    ],
    achievements: [
      { id: 1, name: "Top 10% in LeetCode Weekly Contest", year: "2023" },
      { id: 2, name: "Hackathon Winner - Best UI Design", year: "2022" },
      { id: 3, name: "Open Source Contributor - React", year: "2021" }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="border-none shadow-md overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-green-600 to-blue-600"></div>
            <CardContent className="relative pt-0">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-end -mt-12 sm:-mt-16">
                <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-white dark:border-gray-800 rounded-full">
                  <AvatarImage src={userData.personal.avatar} alt={userData.personal.name} />
                  <AvatarFallback className="text-2xl">{userData.personal.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-1">{userData.personal.name}</h1>
                  <p className="text-gray-500 dark:text-gray-400">{userData.personal.title}</p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 mt-3 sm:items-center">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Mail size={14} />
                      <span>{userData.personal.email}</span>
                    </div>
                    <div className="hidden sm:block text-gray-300">•</div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin size={14} />
                      <span>{userData.personal.location}</span>
                    </div>
                  </div>
                </div>
                
                <Button className="hidden sm:flex items-center gap-2">
                  <Edit size={16} />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - About, Skills */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{userData.personal.bio}</p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {userData.education.map(edu => (
                  <div key={edu.id} className="flex gap-4">
                    <div className="mt-1">
                      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                        <GraduationCap size={18} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{edu.institution}</h3>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-2">
                        <span>{edu.degree}</span>
                        <span className="text-gray-300">•</span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {edu.year}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{edu.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Coding Profiles, Skills, Achievements */}
          <div className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Coding Profiles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userData.codingProfiles.map(profile => (
                  <a 
                    key={profile.id}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="mr-3">
                      {profile.platform === "GitHub" && <Github className="text-gray-800 dark:text-white" size={24} />}
                      {profile.platform === "LeetCode" && <Code className="text-orange-500" size={24} />}
                      {profile.platform === "HackerRank" && <Code className="text-green-500" size={24} />}
                    </div>
                    <div>
                      <div className="font-medium">{profile.platform}</div>
                      <div className="text-sm text-gray-500">@{profile.username}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {profile.contributions || profile.stats || profile.badges}
                      </div>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="px-2 py-1 rounded-md">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {userData.achievements.map(ach => (
                  <div key={ach.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
                    <div className="mt-1">
                      <Award size={18} className="text-amber-500" />
                    </div>
                    <div>
                      <div className="font-medium">{ach.name}</div>
                      <div className="text-sm text-gray-500">{ach.year}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
