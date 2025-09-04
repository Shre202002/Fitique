
"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User, Package, Heart, MapPin, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Defines the possible values for the active tab in the account section.
type ActiveTab = 'profile' | 'orders' | 'wishlist' | 'addresses';

// The main component for the user account page.
export default function AccountPage() {
    // State to manage the currently active tab. Defaults to 'profile'.
    const [activeTab, setActiveTab] = useState<ActiveTab>('profile');
    // Next.js router for navigation.
    const router = useRouter();

    // Handles the user logout process.
    const handleLogout = () => {
        // In a real app, this is where you would call the backend to invalidate the user's session/token.
        // For example: await fetch('/api/logout', { method: 'POST' });
        console.log('User logged out');
        // Redirect the user to the login page after logout.
        router.push('/login');
    };

    // Renders the content based on the active tab.
    const renderContent = () => {
        switch (activeTab) {
            // Case for the 'Profile' tab.
            case 'profile':
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Manage your personal details and saved measurements.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Static user data. In a real app, this would be fetched from the backend. */}
                            <div className='grid sm:grid-cols-2 gap-4'>
                                <div><strong>Name:</strong> Jane Doe</div>
                                <div><strong>Email:</strong> jane.doe@example.com</div>
                            </div>
                            {/* 
                                This button would trigger a form or a modal to edit user details.
                                On save, it would send a PUT/PATCH request to the backend.
                                
                                Backend Endpoint: PUT /api/user/profile
                                Payload:
                                {
                                    "name": "Jane Doe Updated",
                                    "email": "jane.doe.updated@example.com"
                                    // other fields...
                                }
                            */}
                            <Button>Edit Profile</Button>
                        </CardContent>
                    </Card>
                );
            // Case for the 'Orders' tab.
            case 'orders':
                return (
                     <Card>
                        <CardHeader>
                            <CardTitle>Order History</CardTitle>
                            <CardDescription>View your past orders.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* 
                                Order history would be fetched from the backend.
                                Backend Endpoint: GET /api/user/orders
                            */}
                            <div className="space-y-4">
                               {/* Example of a single order item. */}
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
            // Case for the 'Wishlist' tab.
            case 'wishlist':
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Wishlist</CardTitle>
                            <CardDescription>Your saved items.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* 
                                Wishlist items would be fetched from the backend.
                                Backend Endpoint: GET /api/user/wishlist
                            */}
                            <p>Your wishlist is empty.</p>
                        </CardContent>
                    </Card>
                );
            // Case for the 'Addresses' tab.
            case 'addresses':
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>My Addresses</CardTitle>
                            <CardDescription>Manage your shipping addresses.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             {/* 
                                Saved addresses would be fetched from the backend.
                                Backend Endpoint: GET /api/user/addresses

                                The "Add New Address" button would open a form.
                                On submit, it would send a POST request to the backend.
                                Backend Endpoint: POST /api/user/addresses
                                Payload:
                                {
                                    "addressLine1": "123 Main St",
                                    "city": "Anytown",
                                    "state": "Anystate",
                                    "zip": "12345",
                                    // other fields...
                                }
                            */}
                            <p>You have no saved addresses.</p>
                            <Button className="mt-4">Add New Address</Button>
                        </CardContent>
                    </Card>
                );
            // Default case returns nothing if no tab is matched.
            default:
                return null;
        }
    };

    // Main render method for the component.
    return (
        <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
            <h1 className="text-3xl md:text-4xl font-bold font-headline text-accent mb-8">My Account</h1>
            <div className="grid md:grid-cols-[250px_1fr] gap-8 items-start">
                {/* Navigation menu for account sections. */}
                <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                    {/* Each button sets the active tab, changing its style and the rendered content. */}
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
                    {/* Logout button. */}
                    <Button variant="ghost" onClick={handleLogout} className="justify-start gap-2 text-destructive hover:text-destructive">
                        <LogOut className="w-4 h-4" /> Logout
                    </Button>
                </nav>
                {/* Renders the content for the currently selected tab. */}
                <div className="space-y-8">
                   {renderContent()}
                </div>
            </div>
        </div>
    );
}
