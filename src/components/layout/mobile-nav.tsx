
"use client";

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

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

// Navigation links for the mobile slide-out menu.
const mobileNavLinks = [
    { href: '/products', label: 'SHOP' },
    { href: '/products', label: 'NEW ARRIVALS' },
    { href: '/account', label: 'MY ACCOUNT' },
    { href: '/account', label: 'WISHLIST' },
    { href: '/tailor/register', label: 'BECOME A TAILOR' },
];

export function MobileNav() {
    return (
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
    )
}
