import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User, Package, Heart, MapPin, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
    return (
        <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
            <h1 className="text-3xl md:text-4xl font-bold font-headline text-accent mb-8">My Account</h1>
            <div className="grid md:grid-cols-[250px_1fr] gap-8 items-start">
                <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <Button variant="ghost" className="justify-start gap-2 text-accent bg-primary/10">
                        <User className="w-4 h-4" /> Profile
                    </Button>
                    <Button variant="ghost" className="justify-start gap-2">
                        <Package className="w-4 h-4" /> Orders
                    </Button>
                    <Button variant="ghost" className="justify-start gap-2">
                        <Heart className="w-4 h-4" /> Wishlist
                    </Button>
                    <Button variant="ghost" className="justify-start gap-2">
                        <MapPin className="w-4 h-4" /> Addresses
                    </Button>
                    <Separator className="my-2" />
                    <Button variant="ghost" className="justify-start gap-2 text-destructive hover:text-destructive">
                        <LogOut className="w-4 h-4" /> Logout
                    </Button>
                </nav>
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Manage your personal details and saved measurements.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className='grid sm:grid-cols-2 gap-4'>
                                <div><strong>Name:</strong> Jane Doe</div>
                                <div><strong>Email:</strong> jane.doe@example.com</div>
                            </div>
                            <Button>Edit Profile</Button>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Order History</CardTitle>
                            <CardDescription>View your past orders.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                               <div className="flex flex-wrap justify-between items-center gap-4">
                                   <div>
                                       <p className="font-semibold">Order #12345</p>
                                       <p className="text-sm text-muted-foreground">Date: July 20, 2024</p>
                                   </div>
                                   <p className='font-medium'>$125.50</p>
                                   <Button variant="outline" size="sm">View Details</Button>
                               </div>
                               <Separator />
                                <div className="flex flex-wrap justify-between items-center gap-4">
                                   <div>
                                       <p className="font-semibold">Order #12344</p>
                                       <p className="text-sm text-muted-foreground">Date: June 15, 2024</p>
                                   </div>
                                   <p className='font-medium'>$89.99</p>
                                   <Button variant="outline" size="sm">View Details</Button>
                               </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
