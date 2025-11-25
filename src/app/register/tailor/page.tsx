"use client";
import Link from "next/link";
import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";

const specializations = [
    "Traditional Wear",
    "Western Wear",
    "Formal Suits",
    "Wedding Attire",
    "Casual Clothing",
    "Ethnic Wear",
    "Alterations",
    "Embroidery",
];

export default function TailorRegisterPage() {
    const [date, setDate] = useState<Date>();
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        dob: "",
        businessName: "",
        experience: "",
        specializations: [] as string[],
        businessDescription: "",
        completeAddress: "",
        city: "",
        state: "",
        pincode: "",
        terms: false,
        commission: false,
    });

    const [files, setFiles] = useState({
        profilePhoto: null as File | null,
        portfolioImages: [] as File[],
        license: null as File | null,
    });

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleFileChange = (e: any) => {
        const { name, files: inputFiles } = e.target;
        if (name === "portfolioImages") {
            setFiles({ ...files, [name]: Array.from(inputFiles) });
        } else {
            setFiles({ ...files, [name]: inputFiles[0] });
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();

        for (const key in form) {
            formData.append(key, (form as any)[key]);
        }

        form.specializations.forEach((s) => formData.append("specializations[]", s));

        if (files.profilePhoto) formData.append("profilePhoto", files.profilePhoto);
        if (files.license) formData.append("license", files.license);
        files.portfolioImages.forEach((file) => formData.append("portfolioImages", file));

        formData.append("role", "tailor");

        try {
            const res = await fetch("/api/users", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (res.ok) alert("Tailor registered successfully!");
            else alert(`Error: ${data.error}`);
        } catch (err) {
            console.error("Submit failed:", err);
            alert("Something went wrong while submitting.");
        }
    };

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-accent">
                    Join Fitique as a Tailor
                </h1>
                <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                    Share your craftsmanship with fashion enthusiasts and build your custom tailoring
                    business.
                </p>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Personal Information Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid sm:grid-cols-2 gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="full-name">Full Name *</Label>
                            <Input
                                id="full-name"
                                name="fullName"
                                value={form.fullName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                                id="phone"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="+1 (555) 555-5555"
                                required
                                type="number"
                                min={1000000000}     // 10 digits minimum
                                max={9999999999}     // 10 digits maximum
                            />
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
                                        onSelect={(selectedDate) => {
                                            setDate(selectedDate);
                                            setForm({
                                                ...form,
                                                dob: selectedDate
                                                    ? selectedDate.toISOString().split("T")[0]
                                                    : "",
                                            });
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="grid gap-2 sm:col-span-2">
                            <Label htmlFor="profile-photo">Profile Photo</Label>
                            <Input
                                id="profile-photo"
                                name="profilePhoto"
                                type="file"
                                onChange={handleFileChange}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Business Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Business Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="business-name">Business/Shop Name *</Label>
                                <Input
                                    id="business-name"
                                    name="businessName"
                                    value={form.businessName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="experience">Years of Experience *</Label>
                                <Input
                                    id="experience"
                                    name="experience"
                                    type="number"
                                    value={form.experience}
                                    onChange={handleChange}
                                    required
                                    min={0}
                                    max={60}
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label>Specializations *</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {specializations.map((spec) => (
                                    <div key={spec} className="flex items-center gap-2">
                                        <Checkbox
                                            id={`spec-${spec}`}
                                            checked={form.specializations.includes(spec)}
                                            onCheckedChange={(checked) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    specializations: checked
                                                        ? [...prev.specializations, spec]
                                                        : prev.specializations.filter((s) => s !== spec),
                                                }))
                                            }
                                        />
                                        <Label htmlFor={`spec-${spec}`} className="font-normal">
                                            {spec}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="business-description">Business Description *</Label>
                            <Textarea
                                id="business-description"
                                name="businessDescription"
                                value={form.businessDescription}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="portfolio-images">Portfolio Images</Label>
                            <Input
                                id="portfolio-images"
                                name="portfolioImages"
                                type="file"
                                multiple
                                onChange={handleFileChange}
                            />
                            <p className="text-sm text-muted-foreground">
                                Upload images of your work (Max 10 images)
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Address Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Business Address</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="complete-address">Complete Address *</Label>
                            <Textarea
                                id="complete-address"
                                name="completeAddress"
                                value={form.completeAddress}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="grid sm:grid-cols-3 gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="city">City *</Label>
                                <Input
                                    id="city"
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="state">State *</Label>
                                <Input
                                    id="state"
                                    name="state"
                                    value={form.state}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="pincode">Pincode *</Label>
                                <Input
                                    id="pincode"
                                    name="pincode"
                                    value={form.pincode}
                                    onChange={handleChange}
                                    type="number"
                                    placeholder="110001"
                                    required
                                    min={100000}         // 6 digits minimum
                                    max={999999}         // 6 digits maximum
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Documents & Agreements */}
                <Card>
                    <CardHeader>
                        <CardTitle>Documents & Agreements</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="license">
                                Business License/Certification (Optional)
                            </Label>
                            <Input id="license" name="license" type="file" onChange={handleFileChange} />
                        </div>
                        <div className="flex items-start gap-2">
                            <Checkbox
                                id="terms"
                                name="terms"
                                checked={form.terms}
                                onCheckedChange={(checked) =>
                                    setForm({ ...form, terms: !!checked })
                                }
                            />
                            <Label htmlFor="terms" className="text-sm font-normal">
                                I agree to the{" "}
                                <Link href="#" className="underline text-primary">
                                    Terms & Conditions
                                </Link>{" "}
                                and{" "}
                                <Link href="#" className="underline text-primary">
                                    Privacy Policy
                                </Link>
                            </Label>
                        </div>
                        <div className="flex items-start gap-2">
                            <Checkbox
                                id="commission"
                                name="commission"
                                checked={form.commission}
                                onCheckedChange={(checked) =>
                                    setForm({ ...form, commission: !!checked })
                                }
                            />
                            <Label htmlFor="commission" className="text-sm font-normal">
                                I agree to the 10% commission structure on each successful order
                                through the Fitique platform.
                            </Label>
                        </div>
                    </CardContent>
                </Card>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row-reverse gap-4">
                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                        Submit Registration
                    </Button>
                    <Button type="button" variant="outline" size="lg" className="w-full sm:w-auto">
                        Save as Draft
                    </Button>
                </div>

                <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="underline text-primary">
                        Login here
                    </Link>
                </div>
            </form>
        </div>
    );
}
