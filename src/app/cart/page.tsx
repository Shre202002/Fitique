
"use client"
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '@/context/cart-context';

export default function CartPage() {
  const { cartItems, removeItem, updateItemQuantity } = useCart();
  
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:px-6">
      <h1 className="text-3xl md:text-4xl font-bold font-headline text-accent mb-8">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <h2 className="text-2xl font-semibold text-muted-foreground">Your cart is empty</h2>
            <p className="text-muted-foreground mt-2">Looks like you haven't added anything yet.</p>
            <Button asChild className="mt-6">
                <Link href="/products">Start Shopping</Link>
            </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-[1fr_400px] gap-8 items-start">
            <div className="flex flex-col gap-6">
            {cartItems.map((item) => (
                <div key={item.product.id + item.size} className="flex gap-4 p-4 border rounded-lg bg-card">
                    <Image src={item.product.images[0]} alt={item.product.name} width={96} height={96} className="rounded-md object-cover" data-ai-hint="product apparel"/>
                <div className="flex-1 flex flex-col">
                    <div>
                    <h3 className="font-semibold text-lg">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                        {item.isCustom ? `Custom Fit` : `Size: ${item.size}`}
                    </p>
                    {item.isCustom && <Link href={`/products/${item.product.id}`} className="text-sm text-primary hover:underline">Edit measurements</Link>}
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-2">
                    <p className="font-bold text-lg text-primary">₹{item.product.price.toFixed(2)}</p>
                    {!item.isCustom && (
                        <div className="flex items-center gap-2 border rounded-md">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateItemQuantity(item.product.id, item.size, item.quantity - 1)}><Minus className="h-4 w-4" /></Button>
                            <span className="w-4 text-center">{item.quantity}</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateItemQuantity(item.product.id, item.size, item.quantity + 1)}><Plus className="h-4 w-4" /></Button>
                        </div>
                    )}
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="self-start text-muted-foreground hover:text-destructive hover:bg-destructive/10" onClick={() => removeItem(item.product.id, item.size)}>
                    <X className="w-5 h-5" />
                </Button>
                </div>
            ))}
            </div>
            <div className="bg-card p-6 rounded-lg border flex flex-col gap-4 h-fit sticky top-24">
            <h2 className="text-xl font-semibold">Order Summary</h2>
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
            <Link href="/checkout" className="w-full">
                <Button className="w-full" size="lg">Proceed to Checkout</Button>
            </Link>
            </div>
        </div>
      )}
    </div>
  );
}
