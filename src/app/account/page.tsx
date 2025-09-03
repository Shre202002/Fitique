
"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User, Package, Heart, MapPin, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type ActiveTab = 'profile' | 'orders' | 'wishlist' | 'addresses';

export default function AccountPage() {
    const [activeTab, setActiveTab] = useState<ActiveTab>('profile');
    const router = useRouter();

    const handleLogout = () => {
        // In a real app, you would handle the full logout flow (e.g., clearing tokens)
        console.log('User logged out');
        router.push('/login');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
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
                );
            case 'orders':
                return (
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
                );
            case 'wishlist':
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Wishlist</CardTitle>
                            <CardDescription>Your saved items.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Your wishlist is empty.</p>
                        </CardContent>
                    </Card>
                );
            case 'addresses':
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>My Addresses</CardTitle>
                            <CardDescription>Manage your shipping addresses.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>You have no saved addresses.</p>
                            <Button className="mt-4">Add New Address</Button>
                        </CardContent>
                    </Card>
                );
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
            <h1 className="text-3xl md:text-4xl font-bold font-headline text-accent mb-8">My Account</h1>
            <div className="grid md:grid-cols-[250px_1fr] gap-8 items-start">
                <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <Button variant={activeTab === 'profile' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('profile')} className="justify-start gap-2">
                        <User className="w-4 h-4" /> Profile
                    </Button>
                    <Button variant={activeTab === 'orders' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('orders')} className="justify-start gap-2">
                        <Package className="w-4 h-4" /> Orders
                    </Button>
                    <Button variant={activeTab === 'wishlist' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('wishlist')} className="justify-start gap-2">
                        <Heart className="w-4 h-4" /> Wishlist
                    </Button>
                    <Button variant={activeTab === 'addresses' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('addresses')} className="justify-start gap-2">
                        <MapPin className="w-4 h-4" /> Addresses
                    </Button>
                    <Separator className="my-2" />
                    <Button variant="ghost" onClick={handleLogout} className="justify-start gap-2 text-destructive hover:text-destructive">
                        <LogOut className="w-4 h-4" /> Logout
                    </Button>
                </nav>
                <div className="space-y-8">
                   {renderContent()}
                </div>
            </div>
        </div>
    );
}
