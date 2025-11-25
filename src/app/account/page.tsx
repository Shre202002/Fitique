'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User, Package, Heart, MapPin, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

type ActiveTab = 'profile' | 'orders' | 'wishlist' | 'addresses';

export default function AccountPage() {
    const [activeTab, setActiveTab] = useState<ActiveTab>('profile');
    const [userData, setUserData] = useState<{ firstName: string; lastName: string; email: string; phone: number; address: string; state: string; city: string; pincode: number; role: string; } | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            console.log(token);

            if (!token) {
                console.log('No tocken Recived');

                router.replace('/login');
                return;
            }

            try {
                const res = await fetch('/api/users/profile', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });

                console.log(res);

                if (!res.ok) {
                    throw new Error('Invalid token');
                }

                const data = await res.json();
                setUserData({
                    firstName: data?.firstName || 'User',
                    lastName: data?.lastName || 'unknown',
                    email: data?.email || 'unknown@example.com',
                    phone: data?.phone || 0,
                    address: data?.address || 'unknown',
                    state: data?.state || 'unknown',
                    city: data?.city || 'unknown',
                    pincode: data?.pincode || 0,
                    role: data?.role || 'unknown',
                });
            } catch (error) {
                console.error('Auth error:', error);
                localStorage.removeItem('token');
                router.replace('/login');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    const handleLogout = async () => {
        try {
            // call server logout endpoint if needed (currently implemented as GET)
            await fetch('/api/users/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('token');
            router.replace('/login');
        }
    };

    const renderContent = () => {
        if (loading) {
            return (
                <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                        Checking account details...
                    </CardContent>
                </Card>
            );
        }

        switch (activeTab) {
            case 'profile':
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Manage your personal details and saved measurements.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {userData ? (
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div><strong>First Name:</strong> {userData.firstName}</div>
                                    <div><strong>Email:</strong> {userData.email}</div>
                                    <div><strong>Phone:</strong> {userData.phone}</div>
                                    <div><strong>Address:</strong> {userData.address}</div>
                                    <div><strong>State:</strong> {userData.state}</div>
                                    <div><strong>City:</strong> {userData.city}</div>
                                    <div><strong>Pincode:</strong> {userData.pincode}</div>
                                    <div><strong>Role:</strong> {userData.role}</div>
                                </div>


                            ) : (
                                <p>No user data available.</p>
                            )}
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
                            <p>No orders found yet.</p>
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
                            <p>No saved addresses.</p>
                            <Button className="mt-4">Add New Address</Button>
                        </CardContent>
                    </Card>
                );
        }
    };

    const navItems = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'orders', label: 'Orders', icon: Package },
        { id: 'wishlist', label: 'Wishlist', icon: Heart },
        { id: 'addresses', label: 'Addresses', icon: MapPin },
    ];

    return (
        <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
            <h1 className="text-3xl md:text-4xl font-bold text-accent mb-8">My Account</h1>

            <div className="grid md:grid-cols-[250px_1fr] gap-8 items-start">
                {/* Sidebar Navigation */}
                <nav className="hidden md:flex flex-col gap-2 text-sm text-muted-foreground">
                    {navItems.map(item => (
                        <Button
                            key={item.id}
                            variant={activeTab === item.id ? 'secondary' : 'ghost'}
                            onClick={() => setActiveTab(item.id as ActiveTab)}
                            className="justify-start gap-2"
                        >
                            <item.icon className="w-4 h-4" /> {item.label}
                        </Button>
                    ))}
                    <Separator className="my-2" />
                    <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="justify-start gap-2 text-destructive hover:text-destructive"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </Button>
                </nav>

                {/* Main Content */}
                <div className="space-y-8 md:col-start-2">{renderContent()}</div>

                {/* Mobile Logout */}
                <div className="md:hidden mt-4">
                    <Button
                        variant="outline"
                        onClick={handleLogout}
                        className="w-full justify-center gap-2 text-destructive"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}
