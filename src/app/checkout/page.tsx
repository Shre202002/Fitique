
"use client"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/cart-context';
import Image from 'next/image';

export default function CheckoutPage() {
    const { cartItems, clearCart } = useCart();
    const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const shipping = 5.00;
    const total = subtotal + shipping;

    const handlePlaceOrder = () => {
        // In a real app, this would process the payment and create an order
        alert('Thank you for your order!');
        clearCart();
    }

    return (
        <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
            <h1 className="text-3xl md:text-4xl font-bold font-headline text-accent mb-8">Checkout</h1>
            {cartItems.length === 0 ? (
                 <div className="text-center py-16 border-2 border-dashed rounded-lg">
                    <h2 className="text-2xl font-semibold text-muted-foreground">Your cart is empty</h2>
                    <p className="text-muted-foreground mt-2">Add items to your cart to proceed to checkout.</p>
                    <Button asChild className="mt-6">
                        <Link href="/products">Start Shopping</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Shipping and Payment */}
                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Shipping Address</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="first-name">First Name</Label>
                                        <Input id="first-name" placeholder="John" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="last-name">Last Name</Label>
                                        <Input id="last-name" placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" placeholder="123 Main St" />
                                </div>
                                <div className="grid sm:grid-cols-3 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input id="city" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="state">State</Label>
                                        <Input id="state" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="zip">Zip Code</Label>
                                        <Input id="zip" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Payment Information</CardTitle>
                                <CardDescription>All transactions are secure and encrypted.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="card-number">Card Number</Label>
                                    <Input id="card-number" placeholder="**** **** **** 1234" />
                                </div>
                                <div className="grid sm:grid-cols-3 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="expiry-date">Expiry Date</Label>
                                        <Input id="expiry-date" placeholder="MM/YY" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="cvc">CVC</Label>
                                        <Input id="cvc" placeholder="123" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-card p-6 rounded-lg border flex flex-col gap-4 h-fit sticky top-24">
                        <h2 className="text-xl font-semibold">Order Summary</h2>
                         <div className="space-y-4">
                            {cartItems.map(item => (
                                <div key={item.product.id + item.size} className="flex items-center gap-4">
                                    <div className="relative">
                                        <Image src={item.product.images[0]} alt={item.product.name} width={64} height={64} className="rounded-md object-cover" />
                                        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">{item.quantity}</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium">{item.product.name}</p>
                                        <p className="text-sm text-muted-foreground">{item.isCustom ? 'Custom Fit' : `Size: ${item.size}`}</p>
                                    </div>
                                    <p className="font-medium">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <Separator />
                        <div className="flex justify-between text-muted-foreground">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                            <span>Shipping</span>
                            <span>₹{shipping.toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                        <Button className="w-full" size="lg" onClick={handlePlaceOrder}>Place Order</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
