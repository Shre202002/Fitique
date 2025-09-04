
"use client";

import Link from 'next/link';
import { ShoppingCart, User, Heart, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/context/cart-context';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

// Reusable SVG icon for the logo.
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

// The main header component for the application.
export function Header() {
  // Access cart items from the cart context.
  const { cartItems } = useCart();
  // State to track if the component is mounted on the client. This is crucial for avoiding hydration errors.
  const [isClient, setIsClient] = useState(false);
  // State to track if the page has been scrolled.
  const [isScrolled, setIsScrolled] = useState(false);
  // Gets the current URL path.
  const pathname = usePathname();
  // Checks if the current page is the homepage.
  const isHomePage = pathname === '/';
  
  // Effect to set the `isClient` state to true once the component mounts in the browser.
  // This prevents client-side-only UI (like the cart count) from mismatching the server render.
  useEffect(() => {
    setIsClient(true);

    // Function to handle the scroll event.
    const handleScroll = () => {
      // For the homepage, the header becomes opaque after scrolling 50px.
      // For other pages, it's always opaque.
      if (isHomePage) {
        setIsScrolled(window.scrollY > 50);
      } else {
        setIsScrolled(true);
      }
    };

    // Add scroll event listener.
    window.addEventListener('scroll', handleScroll);
    // Initial check on mount.
    handleScroll(); 

    // Cleanup function to remove the event listener.
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]); // Dependency array ensures this effect re-runs if the page changes.
  
  // Calculates the total number of items in the cart. Rendered only on the client.
  const totalQuantity = isClient ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0;

  // Navigation links for the main desktop menu.
  const mainNavLinks = [
    { href: '/products', label: 'HALF SLEEVE' },
    { href: '/products', label: 'LINEN SHIRTS' },
    { href: '/products', label: 'HEMP SHIRTS' },
    { href: '/products', label: 'FULL SLEEVE' },
    { href: '/products', label: 'GIFTING' },
    { href: '/products', label: 'NEW ARRIVALS' },
  ];

  // Navigation links for the mobile slide-out menu.
  const mobileNavLinks = [
    { href: '/products', label: 'SHOP' },
    { href: '/products', label: 'NEW ARRIVALS' },
    { href: '/products', label: 'GIFTING' },
    { href: '/tailor/register', label: 'BECOME A TAILOR' },
  ]

  // Dynamically sets header classes based on scroll state for transparency effect.
  const headerClasses = `sticky top-0 z-50 w-full transition-colors duration-300 ${
    isScrolled ? 'bg-accent text-accent-foreground shadow-md' : 'bg-transparent text-white'
  }`;
  
  return (
    <header className={headerClasses}>
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        {/* Mobile Menu Trigger (Hamburger Icon) */}
        <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden hover:bg-white/10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
               <SheetHeader>
                  <SheetTitle className="sr-only">Main Menu</SheetTitle>
                </SheetHeader>
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

        {/* Header action icons */}
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
              {/* The cart quantity badge is only rendered on the client to prevent hydration errors. */}
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

       {/* Desktop Navigation Links */}
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
