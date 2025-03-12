import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
  return (
    <div>
      <Card className="relative w-[350px] overflow-hidden">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)}/>
              </div>
              {/* Role Selection */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="role">Select Role</Label>
                <Select>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Choose a role" />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Register</Button>
          <Button>Login</Button>
        </CardFooter>
        <BorderBeam duration={4} size={300} reverse className="from-transparent via-green-500 to-transparent" />
      </Card>
    </div>
  );
}
