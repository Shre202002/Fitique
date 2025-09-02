import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronRight } from 'lucide-react';

export default function TailorRegisterPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
      <div className="mb-8 text-sm text-muted-foreground flex items-center gap-1.5">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span>Tailor Application</span>
      </div>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-accent">
            Become a Skyloom Tailor
          </h1>
          <p className="text-lg text-muted-foreground">
            Join our network of skilled artisans and help us create perfectly tailored garments for customers worldwide. We offer competitive rates, flexible work, and a supportive community.
          </p>
          <div className="aspect-video rounded-lg overflow-hidden border">
             <Image
                src="https://picsum.photos/600/400"
                alt="Tailor at work"
                width={600}
                height={400}
                className="w-full h-full object-cover"
                data-ai-hint="tailor sewing"
              />
          </div>
        </div>
        <div>
          <Card className="w-full max-w-lg mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-accent">Apply Now</CardTitle>
              <CardDescription>Fill out the form below to start your journey with Skyloom.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" placeholder="John" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" placeholder="Doe" required />
                    </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 555-5555" />
                </div>
                 <div className="grid gap-2">
                  <Label htmlFor="experience">Tell us about your experience</Label>
                  <Textarea id="experience" placeholder="Describe your tailoring skills, experience, and why you want to join Skyloom..." required />
                </div>
                <Button type="submit" className="w-full mt-2" size="lg">
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
