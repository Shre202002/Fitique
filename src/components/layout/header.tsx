
"use client";

import Link from 'next/link';
import { ShoppingCart, User, Heart, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/context/cart-context';
import { useState, useEffect } from 'react';

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

export function Header() {
  const { cartItems } = useCart();
  const [isClient, setIsClient] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const totalQuantity = isClient ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0;

  const mainNavLinks = [
    { href: '/products', label: 'HALF SLEEVE' },
    { href: '/products', label: 'LINEN SHIRTS' },
    { href: '/products', label: 'HEMP SHIRTS' },
    { href: '/products', label: 'FULL SLEEVE' },
    { href: '/products', label: 'GIFTING' },
    { href: '/products', label: 'NEW ARRIVALS' },
  ];

  const mobileNavLinks = [
    { href: '/products', label: 'SHOP' },
    { href: '/products', label: 'NEW ARRIVALS' },
    { href: '/products', label: 'GIFTING' },
    { href: '/tailor/register', label: 'BECOME A TAILOR' },
  ]

  return (
    <header className={`sticky top-0 z-50 w-full transition-colors duration-300 ${isScrolled ? 'bg-accent text-accent-foreground shadow-md' : 'bg-transparent text-white'}`}>
      <div className={`py-2 text-center text-sm px-4 overflow-x-auto whitespace-nowrap transition-colors duration-300 ${isScrolled ? 'bg-primary text-primary-foreground' : 'bg-primary/80 text-primary-foreground'}`}>
        <span className="inline-block mx-4">Buy 3 Shirts, Get 15% Off!</span>
        <span className="hidden sm:inline-block mx-4">Buy 2 Shirts, Get 10% Off!</span>
        <span className="hidden md:inline-block mx-4">Buy 1 Shirt, Get 5% Off!</span>
      </div>
      
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        {/* Mobile Menu Trigger */}
        <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden hover:bg-white/10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-6 p-6 bg-background text-foreground h-full">
                <Link href="/" className="flex items-center gap-2 mb-6">
                  <MountainIcon className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold">Fitique</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {mobileNavLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
        </Sheet>
        
        {/* Desktop Logo */}
        <Link href="/" className="hidden md:flex items-center gap-2">
          <MountainIcon className="h-6 w-6" />
          <span className="text-xl font-bold">Fitique</span>
        </Link>
        
        {/* Mobile Logo */}
         <Link href="/" className="flex items-center gap-2 md:hidden">
          <MountainIcon className="h-6 w-6" />
          <span className="text-xl font-bold">Fitique</span>
        </Link>


        <div className="flex items-center gap-2">
           <Link href="/account">
            <Button variant="ghost" size="icon" className="hover:bg-white/10">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="hover:bg-white/10">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
           <Link href="/account">
            <Button variant="ghost" size="icon" className="hover:bg-white/10">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative hover:bg-white/10">
              {isClient && totalQuantity > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {totalQuantity}
                </span>
              )}
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </div>
      </div>

       <nav className={`hidden md:flex justify-center items-center h-12 border-t transition-colors duration-300 ${isScrolled ? 'border-accent-foreground/10' : 'border-transparent'}`}>
          <div className="container flex justify-center gap-6 max-w-7xl">
            {mainNavLinks.map((link) => (
                <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors ${isScrolled ? 'text-accent-foreground/80 hover:text-accent-foreground' : 'text-white/80 hover:text-white'}`}
                >
                {link.label}
                </Link>
            ))}
          </div>
        </nav>
    </header>
  );
}
