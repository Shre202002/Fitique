import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { getFeaturedProducts } from '@/lib/data';

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-center bg-gradient-to-br from-primary/10 to-secondary/20">
        <div className="container px-4 md:px-6 z-10">
          <div className="grid gap-6">
            <h1 className="text-4xl font-bold tracking-tighter text-accent sm:text-5xl md:text-6xl lg:text-7xl font-headline">
              Perfect Fit,
              <br />
              Perfectly You.
            </h1>
            <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">
              Discover bespoke clothing tailored to your exact measurements.
              Unleash your style with Skyloom.
            </p>
            <div>
              <Link href="/products">
                <Button size="lg">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-accent">
                Featured Collection
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Handpicked styles and trending designs, curated just for you.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
