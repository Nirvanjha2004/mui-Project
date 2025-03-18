import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { 
  User, 
  Briefcase, 
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
  Twitter,
  FileText
} from "lucide-react";
import Navbar from "../AdminDashboard/Navbar";

function AdminProfile() {
  const [activeTab, setActiveTab] = useState("overview");
  
  const adminData = {
    personal: {
      name: "Alex Johnson",
      title: "Senior Administrator",
      email: "alex.johnson@quizmaster.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      bio: "Experienced education technology administrator with over 8 years of experience in developing and managing online assessment platforms. Passionate about improving educational outcomes through technology.",
      avatar: "/assets/avatars/admin.jpg"
    },
    education: [
      {
        id: 1,
        institution: "Stanford University",
        degree: "Master of Computer Science",
        year: "2015-2017",
        description: "Specialized in Artificial Intelligence and Machine Learning with focus on educational technology applications."
      },
      {
        id: 2,
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science in Computer Science",
        year: "2011-2015",
        description: "Graduated with honors. Participated in the ACM programming competitions."
      }
    ],
    experience: [
      {
        id: 1,
        role: "Senior Administrator",
        company: "QuizMaster",
        duration: "2020 - Present",
        description: "Manage the technical aspects of the QuizMaster platform, including test creation, user management, and data analytics."
      },
      {
        id: 2,
        role: "Assessment Platform Lead",
        company: "EduTech Solutions",
        duration: "2017 - 2020",
        description: "Led a team of developers in building an assessment platform used by over 50 educational institutions."
      },
      {
        id: 3,
        role: "Software Developer",
        company: "Learning Innovations Inc.",
        duration: "2015 - 2017",
        description: "Developed interactive learning modules and assessment tools for K-12 education."
      }
    ],
    codingProfiles: [
      { id: 1, platform: "GitHub", username: "alexj-dev", url: "https://github.com/alexj-dev", contributions: "250+ contributions in last year" },
      { id: 2, platform: "LeetCode", username: "alex_johnson", url: "https://leetcode.com/alex_johnson", stats: "Solved 450+ problems" },
      { id: 3, platform: "HackerRank", username: "alexjohnson", url: "https://hackerrank.com/alexjohnson", badges: "5-star algorithm badge" },
      { id: 4, platform: "Stack Overflow", username: "alex-j", url: "https://stackoverflow.com/users/alex-j", reputation: "15k+ reputation" },
    ],
    skills: [
      "JavaScript", "TypeScript", "React", "Node.js", "Python", "SQL", 
      "Data Visualization", "Machine Learning", "Test Development", 
      "UI/UX Design", "Project Management", "API Design"
    ],
    certifications: [
      { id: 1, name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", year: "2022" },
      { id: 2, name: "Google Professional Data Engineer", issuer: "Google Cloud", year: "2021" },
      { id: 3, name: "Certified Scrum Master", issuer: "Scrum Alliance", year: "2019" },
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="border-none shadow-md overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
            <CardContent className="relative pt-0">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-end -mt-12 sm:-mt-16">
                <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-white dark:border-gray-800 rounded-full">
                  <AvatarImage src={adminData.personal.avatar} alt={adminData.personal.name} />
                  <AvatarFallback className="text-2xl">{adminData.personal.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-1">{adminData.personal.name}</h1>
                  <p className="text-gray-500 dark:text-gray-400">{adminData.personal.title}</p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 mt-3 sm:items-center">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Mail size={14} />
                      <span>{adminData.personal.email}</span>
                    </div>
                    <div className="hidden sm:block text-gray-300">•</div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin size={14} />
                      <span>{adminData.personal.location}</span>
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
          {/* Left Column - About, Skills, Education */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{adminData.personal.bio}</p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Work Experience</CardTitle>
                <Badge variant="outline" className="font-normal">
                  {adminData.experience.length} Positions
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                {adminData.experience.map(exp => (
                  <div key={exp.id} className="flex gap-4">
                    <div className="mt-1">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <Briefcase size={18} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{exp.role}</h3>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-2">
                        <span>{exp.company}</span>
                        <span className="text-gray-300">•</span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {adminData.education.map(edu => (
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
          
          {/* Right Column - Coding Profiles, Skills, Certifications */}
          <div className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Coding Profiles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {adminData.codingProfiles.map(profile => (
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
                      {profile.platform === "Stack Overflow" && <Globe className="text-orange-500" size={24} />}
                    </div>
                    <div>
                      <div className="font-medium">{profile.platform}</div>
                      <div className="text-sm text-gray-500">@{profile.username}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {profile.contributions || profile.stats || profile.badges || profile.reputation}
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
                  {adminData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="px-2 py-1 rounded-md">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Certifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {adminData.certifications.map(cert => (
                  <div key={cert.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
                    <div className="mt-1">
                      <Award size={18} className="text-amber-500" />
                    </div>
                    <div>
                      <div className="font-medium">{cert.name}</div>
                      <div className="text-sm text-gray-500">{cert.issuer} • {cert.year}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href="#" className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
                  <Mail size={18} className="text-gray-500" />
                  <span>{adminData.personal.email}</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
                  <Phone size={18} className="text-gray-500" />
                  <span>{adminData.personal.phone}</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
                  <Linkedin size={18} className="text-blue-600" />
                  <span>LinkedIn Profile</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
                  <FileText size={18} className="text-gray-500" />
                  <span>Download Resume</span>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;