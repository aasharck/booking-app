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
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react"

const LoginForm = ({data, handleChange, error, handleSubmit, loading}) => {
  return (
    <div className="center-container">
      <Card className="w-1/3">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login to your Account</CardTitle>
          <CardDescription>
            Enter your email and password to login
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="john@gmail.com"  value={data.email} onChange={handleChange} required/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" placeholder="*******"  value={data.password} onChange={handleChange} required/>
          </div>
        </CardContent>
        <CardFooter className="block">
        <Button
            className="w-full mb-2"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Logging In..." : "Log In"}
          </Button>
          <Link to='/register'>Not registered? Create an account here</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
