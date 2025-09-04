
"use client"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronRight, Calendar as CalendarIcon, Upload } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { format } from 'date-fns';

// Static array of specializations for tailors to choose from.
const specializations = [
    "Traditional Wear", "Western Wear", "Formal Suits", "Wedding Attire", 
    "Casual Clothing", "Ethnic Wear", "Alterations", "Embroidery"
];

// The main component for the tailor registration page.
export default function TailorRegisterPage() {
    // State to manage the selected date for the date of birth.
    const [date, setDate] = useState<Date>()

    /*
        BACKEND INTEGRATION POINT: Tailor Registration
        
        When this form is submitted, it should send a multipart/form-data POST request to the backend.
        This is necessary to handle file uploads (profile photo, portfolio, etc.).
        
        Backend Endpoint: POST /api/tailors/register

        The backend would process the text fields and file uploads, create a new tailor profile,
        and likely mark it as "pending approval" until an admin verifies it.

        Form Data Structure:
        - full-name: "John Doe" (String)
        - email: "m@example.com" (String)
        - phone: "+1 (555) 555-5555" (String)
        - dob: "YYYY-MM-DD" (String, optional)
        - profile-photo: (File object, optional)
        - business-name: "Doe's Fine Tailoring" (String)
        - experience: 15 (Number)
        - specializations: ["Traditional Wear", "Formal Suits"] (Array of Strings)
        - business-description: "..." (String)
        - portfolio-images: (Array of File objects, optional)
        - complete-address: "123 Craftsmans Ln" (String)
        - city: "Sewville" (String)
        - state: "Fabricana" (String)
        - pincode: "98765" (String)
        - license: (File object, optional)
        - terms: "on" (Boolean, based on checkbox)
        - commission: "on" (Boolean, based on checkbox)
    */

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
        <div className="text-center mb-8">
             <h1 className="text-4xl md:text-5xl font-bold font-headline text-accent">
                Join Fitique as a Tailor
            </h1>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                Share your craftsmanship with fashion enthusiasts and build your custom tailoring business.
            </p>
        </div>
     
        {/* The main registration form. In a real app, this would be handled with a library like react-hook-form. */}
        <form className="space-y-8">
            {/* Personal Information Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="full-name">Full Name *</Label>
                        <Input id="full-name" placeholder="John Doe" required />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input id="phone" type="tel" placeholder="+1 (555) 555-5555" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid gap-2 sm:col-span-2">
                        <Label htmlFor="profile-photo">Profile Photo</Label>
                        <Input id="profile-photo" type="file" />
                    </div>
                </CardContent>
            </Card>

            {/* Business Information Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Business Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className='grid sm:grid-cols-2 gap-6'>
                        <div className="grid gap-2">
                            <Label htmlFor="business-name">Business/Shop Name *</Label>
                            <Input id="business-name" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="experience">Years of Experience *</Label>
                            <Input id="experience" type="number" required />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label>Specializations *</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {/* Dynamically renders checkboxes for each specialization. */}
                            {specializations.map(spec => (
                                <div key={spec} className="flex items-center gap-2">
                                    <Checkbox id={`spec-${spec}`} />
                                    <Label htmlFor={`spec-${spec}`} className='font-normal'>{spec}</Label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="business-description">Business Description *</Label>
                        <Textarea id="business-description" placeholder="Describe your tailoring experience, style, and what makes your work unique..." required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="portfolio-images">Portfolio Images</Label>
                        <Input id="portfolio-images" type="file" multiple />
                         <p className="text-sm text-muted-foreground">Upload images of your work (Max 10 images)</p>
                    </div>
                </CardContent>
            </Card>
            
            {/* Business Address Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Business Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                     <div className="grid gap-2">
                        <Label htmlFor="complete-address">Complete Address *</Label>
                        <Textarea id="complete-address" placeholder="Shop/Business address with landmarks" required />
                    </div>
                    <div className='grid sm:grid-cols-3 gap-6'>
                        <div className="grid gap-2">
                            <Label htmlFor="city">City *</Label>
                            <Input id="city" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="state">State *</Label>
                            <Input id="state" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="pincode">Pincode *</Label>                            <Input id="pincode" required />
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            {/* Documents & Agreements Section */}
             <Card>
                <CardHeader>
                    <CardTitle>Documents & Agreements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="license">Business License/Certification (Optional)</Label>
                        <Input id="license" type="file" />
                        <p className="text-sm text-muted-foreground">Upload any business license or certification documents</p>
                    </div>
                     <div className="flex items-start gap-2">
                        <Checkbox id="terms" required />
                        <Label htmlFor="terms" className="text-sm font-normal">
                            I agree to the <Link href="#" className='underline text-primary'>Terms & Conditions</Link> and <Link href="#" className='underline text-primary'>Privacy Policy</Link>
                        </Label>
                    </div>
                    <div className="flex items-start gap-2">
                        <Checkbox id="commission" required />
                        <Label htmlFor="commission" className="text-sm font-normal">
                            I agree to the 10% commission structure on each successful order through the Fitique platform.
                        </Label>
                    </div>
                </CardContent>
            </Card>

            {/* Form submission buttons */}
            <div className="flex flex-col sm:flex-row-reverse gap-4">
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                    Submit Registration
                </Button>
                {/* 
                    "Save as Draft" would likely post the current form data to a different endpoint
                    or the same endpoint with a "status: draft" field.
                    Backend Endpoint: POST /api/tailors/draft
                */}
                <Button type="button" variant="outline" size="lg" className="w-full sm:w-auto">
                    Save as Draft
                </Button>
            </div>
            <div className="text-center text-sm">
                Already have an account? <Link href="/login" className="underline text-primary">Login here</Link>
            </div>
        </form>
    </div>
  );
}
