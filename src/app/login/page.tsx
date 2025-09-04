
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// The main component for the login page.
export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] py-12 px-4">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-accent">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* 
              This form would be enhanced with a state management library like 'react-hook-form' 
              to handle form state, validation, and submission.
          */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline text-primary">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            {/* 
                BACKEND INTEGRATION POINT: Standard Login

                On submission, this form would send a POST request to the backend with the user's credentials.
                
                Backend Endpoint: POST /api/auth/login
                Payload:
                {
                    "email": "m@example.com",
                    "password": "user_password"
                }

                The backend would validate the credentials and return a session token (e.g., JWT) 
                which the frontend would store securely (e.g., in an HttpOnly cookie).
            */}
            <Button type="submit" className="w-full">
              Login
            </Button>
            {/* 
                BACKEND INTEGRATION POINT: OAuth Login (Google)

                This button would redirect the user to Google's OAuth consent screen.
                After authorization, Google would redirect back to a specified callback URL
                (e.g., /api/auth/google/callback) with an authorization code.
                The backend would then exchange this code for an access token and user profile information.
            */}
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            {/* This should link to the registration page. */}
            <Link href="#" className="underline text-primary">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
