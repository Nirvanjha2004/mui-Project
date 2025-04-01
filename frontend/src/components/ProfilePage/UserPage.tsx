import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
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
  Twitter,
  FileText,
  BookOpen,
  PenTool
} from "lucide-react";
import UserNavbar from "../UserDashboard/UserNavbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

function UserProfile() {
  const [activeTab, setActiveTab] = React.useState("about");
  
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
    ],
    testResults: [
      { id: 1, title: "React Advanced Concepts", score: 92, date: "Apr 15, 2023", percentile: 85 },
      { id: 2, title: "JavaScript Fundamentals", score: 98, date: "Mar 10, 2023", percentile: 95 },
      { id: 3, title: "CSS & Responsive Design", score: 87, date: "Feb 22, 2023", percentile: 75 },
    ],
    badges: [
      { id: 1, name: "JavaScript Pro", description: "Scored 95%+ on 3 JavaScript tests", icon: "Code" },
      { id: 2, name: "Fast Learner", description: "Completed 10 tests in one month", icon: "Zap" },
      { id: 3, name: "Consistent Performer", description: "Maintained 85%+ average score", icon: "Award" },
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <UserNavbar username={userData.personal.name.split(' ')[0]} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="border-none shadow-md overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-indigo-600 to-blue-500"></div>
            <CardContent className="relative pt-0">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-end -mt-12 sm:-mt-16">
                <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-white dark:border-gray-800 rounded-full">
                  <AvatarImage src={userData.personal.avatar} alt={userData.personal.name} />
                  <AvatarFallback className="text-2xl bg-indigo-100 text-indigo-700">{userData.personal.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
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
        
        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full md:w-auto mx-auto">
            <TabsTrigger value="about" className="flex items-center gap-2">
              <User size={16} />
              About
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <Code size={16} />
              Skills
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <GraduationCap size={16} />
              Education
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Award size={16} />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2">
              <FileText size={16} />
              Test Results
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Main Content */}
        <Tabs>

          <TabsContent value="about" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{userData.personal.bio}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div>
                    <h3 className="font-medium text-lg mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="text-gray-500" size={18} />
                        <span>{userData.personal.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="text-gray-500" size={18} />
                        <span>{userData.personal.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="text-gray-500" size={18} />
                        <span>{userData.personal.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-4">Social Profiles</h3>
                    <div className="space-y-3">
                      <a href="#" className="flex items-center gap-3 hover:text-blue-600 transition-colors">
                        <Github size={18} />
                        <span>GitHub</span>
                      </a>
                      <a href="#" className="flex items-center gap-3 hover:text-blue-600 transition-colors">
                        <Linkedin className="text-blue-600" size={18} />
                        <span>LinkedIn</span>
                      </a>
                      <a href="#" className="flex items-center gap-3 hover:text-blue-600 transition-colors">
                        <Twitter className="text-blue-400" size={18} />
                        <span>Twitter</span>
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-none shadow-md col-span-2">
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
                  <CardTitle className="text-xl">Badges Earned</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userData.badges.map(badge => (
                    <div key={badge.id} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 flex items-start gap-3">
                      <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-2 text-indigo-600 dark:text-indigo-400">
                        {badge.icon === "Code" && <Code size={18} />}
                        {badge.icon === "Zap" && <PenTool size={18} />}
                        {badge.icon === "Award" && <Award size={18} />}
                      </div>
                      <div>
                        <h4 className="font-medium">{badge.name}</h4>
                        <p className="text-sm text-gray-500">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="skills" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Skills & Expertise</CardTitle>
                <CardDescription>Technologies I work with and my proficiency levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Frontend Development</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">JavaScript</span>
                          <span>95%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">React</span>
                          <span>90%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full rounded-full" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">HTML & CSS</span>
                          <span>85%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">TypeScript</span>
                          <span>80%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Other Skills</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">Node.js</span>
                          <span>75%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-green-600 h-full rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">Git & Version Control</span>
                          <span>85%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-green-600 h-full rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">REST APIs</span>
                          <span>80%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-green-600 h-full rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">UI/UX Design</span>
                          <span>70%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-green-600 h-full rounded-full" style={{ width: '70%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Technologies & Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {userData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1 text-sm rounded-md">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="education" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Education</CardTitle>
                <CardDescription>Academic qualifications and certifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {userData.education.map(edu => (
                  <div key={edu.id} className="flex gap-4">
                    <div className="mt-1">
                      <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                        <GraduationCap size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-xl">{edu.institution}</h3>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-3">
                        <span className="font-medium">{edu.degree}</span>
                        <span className="text-gray-300">•</span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {edu.year}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{edu.description}</p>
                      
                      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h4 className="font-medium mb-2">Key Courses</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                          <li>Advanced Data Structures & Algorithms</li>
                          <li>Web Application Development</li>
                          <li>User Interface Design</li>
                          <li>Database Systems</li>
                          <li>Computer Networks</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-6">
                  <h3 className="font-medium text-lg mb-4">Additional Certifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Award className="text-purple-500" size={20} />
                        <h4 className="font-medium">AWS Certified Developer</h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Amazon Web Services • 2023
                      </p>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Award className="text-blue-500" size={20} />
                        <h4 className="font-medium">React Advanced Concepts</h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Frontend Masters • 2022
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="achievements" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Achievements & Awards</CardTitle>
                <CardDescription>Recognition for excellence in various areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {userData.achievements.map(ach => (
                    <div key={ach.id} className="flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                      <div className="mt-1">
                        <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                          <Award size={24} />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">{ach.name}</h3>
                        <div className="text-sm text-gray-500 mb-3">{ach.year}</div>
                        <p className="text-gray-600 dark:text-gray-400">
                          {ach.name.includes("LeetCode") && "Ranked in the top 10% of participants in the LeetCode Weekly Contest, solving complex algorithmic problems within a time constraint."}
                          {ach.name.includes("Hackathon") && "Led a team of 4 developers to create an innovative web application with exceptional UI/UX design, winning first place among 20 competing teams."}
                          {ach.name.includes("Open Source") && "Active contributor to React open-source projects, with multiple pull requests merged into production. Helped improve documentation and fix bugs."}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-5 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-medium text-lg mb-3 flex items-center gap-2">
                    <BookOpen className="text-blue-600" size={20} />
                    Current Goals
                  </h3>
                  <ul className="space-y-2 pl-7 list-disc">
                    <li className="text-gray-700 dark:text-gray-300">Master Next.js and server-side rendering techniques</li>
                    <li className="text-gray-700 dark:text-gray-300">Contribute to at least 5 major open-source projects</li>
                    <li className="text-gray-700 dark:text-gray-300">Achieve top 5% ranking in coding competitions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="results" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Test Results</CardTitle>
                <CardDescription>Performance in various skill assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {userData.testResults.map(result => (
                    <div key={result.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-medium text-lg">{result.title}</h3>
                          <p className="text-sm text-gray-500">Completed on {result.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-lg font-bold rounded-full h-12 w-12 flex items-center justify-center">
                            {result.score}%
                          </div>
                          <div className="text-sm">
                            <div className="text-gray-500">Percentile</div>
                            <div className="font-medium">{result.percentile}%</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              result.score >= 90 ? "bg-green-500" : 
                              result.score >= 80 ? "bg-blue-500" : 
                              "bg-amber-500"
                            }`} 
                            style={{ width: `${result.score}%` }}
                          ></div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2">
                          <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm text-center">
                            <div className="font-medium">{result.score >= 90 ? "Excellent" : result.score >= 80 ? "Good" : "Average"}</div>
                            <div className="text-xs text-gray-500">Performance</div>
                          </div>
                          <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm text-center">
                            <div className="font-medium">Top {100 - result.percentile}%</div>
                            <div className="text-xs text-gray-500">Ranking</div>
                          </div>
                          <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm text-center">
                            <div className="font-medium">25 min</div>
                            <div className="text-xs text-gray-500">Completion Time</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-center">
                    <Button variant="outline" className="mt-4">
                      View All Test Results
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default UserProfile;