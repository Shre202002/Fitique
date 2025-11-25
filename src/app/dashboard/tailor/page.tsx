
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface User {
    name: string;
    email: string;
    phone: string;
    address: {
        house_no: string;
        street: string;
        city: string;
        state: string;
    };
    role: string;
}

interface DashboardStats {
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    totalEarnings: number;
}

export default function TailorDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [stats, setStats] = useState<DashboardStats | null>(null);

    // 🧩 For testing only — no login or API
    useEffect(() => {
        // Simulated tailor data
        const demoUser: User = {
            name: "Riya Tailor",
            email: "shreya@example.com",
            phone: "9876543210",
            address: {
                house_no: "24A",
                street: "Station Road",
                city: "Mumbai",
                state: "Maharashtra",
            },
            role: "Tailor",
        };

        // Simulated dashboard stats
        const demoStats: DashboardStats = {
            totalOrders: 48,
            pendingOrders: 5,
            completedOrders: 43,
            totalEarnings: 78000,
        };

        setUser(demoUser);
        setStats(demoStats);
    }, []);

    const handleLogout = () => {
        router.push("/login");
    };

    if (!user) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-5 flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-center text-blue-600 mb-8">
                        Tailor Dashboard
                    </h2>
                    <nav className="space-y-3">
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => router.push("/tailor/orders")}
                        >
                            🧵 Orders
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => router.push("/tailor/measurements")}
                        >
                            📏 Measurements
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => router.push("/tailor/designs")}
                        >
                            🎨 Designs
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => router.push("/tailor/payments")}
                        >
                            💰 Payments
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => router.push("/tailor/messages")}
                        >
                            💬 Messages
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => router.push("/tailor/profile")}
                        >
                            ⚙️ Profile
                        </Button>
                    </nav>
                </div>
                <Button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white"
                >
                    Logout
                </Button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <h1 className="text-2xl font-bold mb-6">
                    Welcome, {user.name} 👋
                </h1>

                {/* Dashboard Stats */}
                {stats ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card className="bg-blue-50 border border-blue-200">
                            <CardHeader>
                                <CardTitle>Total Orders</CardTitle>
                            </CardHeader>
                            <CardContent className="text-2xl font-bold">
                                {stats.totalOrders}
                            </CardContent>
                        </Card>

                        <Card className="bg-yellow-50 border border-yellow-200">
                            <CardHeader>
                                <CardTitle>Pending Orders</CardTitle>
                            </CardHeader>
                            <CardContent className="text-2xl font-bold">
                                {stats.pendingOrders}
                            </CardContent>
                        </Card>

                        <Card className="bg-green-50 border border-green-200">
                            <CardHeader>
                                <CardTitle>Completed Orders</CardTitle>
                            </CardHeader>
                            <CardContent className="text-2xl font-bold">
                                {stats.completedOrders}
                            </CardContent>
                        </Card>

                        <Card className="bg-purple-50 border border-purple-200">
                            <CardHeader>
                                <CardTitle>Total Earnings</CardTitle>
                            </CardHeader>
                            <CardContent className="text-2xl font-bold">
                                ₹{stats.totalEarnings}
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <p>Loading statistics...</p>
                )}

                {/* Tailor Info */}
                <Card className="max-w-3xl">
                    <CardHeader>
                        <CardTitle>Account Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                        <p>
                            <strong>Address:</strong>{" "}
                            {user.address.house_no}, {user.address.street},{" "}
                            {user.address.city}, {user.address.state}
                        </p>
                        <p><strong>Role:</strong> {user.role}</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
