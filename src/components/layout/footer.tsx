import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
  )
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.9 3.3 4.9-6.1-1.4-12.1-4.9-12.1-4.9-.4 2.1.6 4.4 2.8 5.6-1.4 0-2.8-.6-2.8-.6-.1 2.2 1.2 4.1 3.1 4.7-1.1.3-2.2.2-2.2.2.6 1.8 2.5 3.1 4.5 3.1-2.5 1.9-5.7 3.1-9.1 3.1-1.8 0-3.5-.3-5.2-.8C6.3 21.8 11.2 23 16 23c10.4 0 16.2-8.6 16.2-16.2 0-.2 0-.5-.1-.7 1.1-.8 2.1-1.8 2.9-2.9z" /></svg>
    )
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
    )
}

export function Footer() {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-4 md:px-6">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <MountainIcon className="h-6 w-6" />
            <span className="text-xl font-bold">Fitique</span>
          </Link>
          <p className="text-sm text-accent-foreground/80">
            Beautifully crafted, custom-fit clothing.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-3 md:col-span-2">
          <div className="grid gap-1">
            <h3 className="font-semibold">Shop</h3>
            <Link href="/products" className="hover:underline text-accent-foreground/80">All Products</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <Link href="#" className="hover:underline text-accent-foreground/80">About Us</Link>
            <Link href="/tailor/register" className="hover:underline text-accent-foreground/80">Become a Tailor</Link>
            <Link href="#" className="hover:underline text-accent-foreground/80">Careers</Link>
            <Link href="#" className="hover:underline text-accent-foreground/80">Contact</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Support</h3>
            <Link href="#" className="hover:underline text-accent-foreground/80">FAQ</Link>
            <Link href="#" className="hover:underline text-accent-foreground/80">Shipping & Returns</Link>
            <Link href="#" className="hover:underline text-accent-foreground/80">Privacy Policy</Link>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold">Stay Connected</h3>
          <p className="text-sm text-accent-foreground/80">
            Sign up for our newsletter to get the latest updates.
          </p>
          <form className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-accent-foreground/10 border-accent-foreground/20 text-accent-foreground placeholder:text-accent-foreground/60 focus:ring-primary-foreground"
            />
            <Button type="submit" variant="secondary" className="bg-primary-foreground text-accent hover:bg-primary-foreground/90">Sign Up</Button>
          </form>
        </div>
      </div>
      <div className="border-t border-accent-foreground/20">
        <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-sm md:px-6">
          <p className="text-accent-foreground/80">&copy; {new Date().getFullYear()} Fitique. All rights reserved.</p>
          <div className="flex gap-4 text-accent-foreground/80">
            <FacebookIcon className="h-5 w-5 hover:text-primary-foreground" />
            <TwitterIcon className="h-5 w-5 hover:text-primary-foreground" />
            <InstagramIcon className="h-5 w-5 hover:text-primary-foreground" />
          </div>
        </div>
      </div>
    </footer>
  );
}
