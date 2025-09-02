import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { getFeaturedProducts } from '@/lib/data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image';

const categories = [
    { name: 'Men', image: 'https://picsum.photos/300/300?image=1003', href: '/products' },
    { name: 'Women', image: 'https://picsum.photos/300/300?image=1011', href: '/products' },
    { name: 'Kids', image: 'https://picsum.photos/300/300?image=1041', href: '/products' },
    { name: 'Accessories', image: 'https://picsum.photos/300/300?image=103', href: '/products' },
    { name: 'Formal Wear', image: 'https://picsum.photos/300/300?image=1061', href: '/products' },
    { name: 'Casual Wear', image: 'https://picsum.photos/300/300?image=206', href: '/products' },
]

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="flex flex-col">
      <section className="w-full">
         <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            <CarouselItem>
                <div className="relative w-full h-[60vh] md:h-[80vh]">
                    <Image src="https://picsum.photos/1600/900?image=1011" alt="Hero Image 1" fill className="object-cover" data-ai-hint="fashion model"/>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center">
                        <div className="container px-4 md:px-6 z-10">
                            <div className="grid gap-6 text-white">
                                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
                                    Summer Collection
                                </h1>
                                <p className="max-w-[600px] mx-auto md:text-xl">
                                    Light, breezy, and effortlessly stylish.
                                </p>
                                <div>
                                    <Button size="lg" variant="secondary">
                                        Shop Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CarouselItem>
             <CarouselItem>
                <div className="relative w-full h-[60vh] md:h-[80vh]">
                    <Image src="https://picsum.photos/1600/900?image=1003" alt="Hero Image 2" fill className="object-cover" data-ai-hint="male model"/>
                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center">
                        <div className="container px-4 md:px-6 z-10">
                            <div className="grid gap-6 text-white">
                                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
                                    Custom Fit Denim
                                </h1>
                                <p className="max-w-[600px] mx-auto md:text-xl">
                                    Tailored to your exact measurements.
                                </p>
                                <div>
                                    <Link href="/products/classic-blue-denim">
                                        <Button size="lg" variant="secondary">
                                            Explore
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
        </Carousel>
      </section>
      
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
           <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline text-accent">
                Shop by Category
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 justify-center">
            {categories.map((category) => (
                <Link href={category.href} key={category.name} className="group flex flex-col items-center gap-3">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all">
                        <Image src={category.image} alt={category.name} width={128} height={128} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" data-ai-hint="fashion category"/>
                    </div>
                    <span className="font-semibold text-accent group-hover:text-primary transition-colors">{category.name}</span>
                </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-accent">
                Trending Now
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
          <div className="text-center mt-12">
             <Link href="/products">
                <Button size="lg" variant="outline">
                    View All Products
                </Button>
              </Link>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline text-accent">
                    Shop by Collection
                </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <Link href="/products" className="group relative block w-full h-80 rounded-lg overflow-hidden">
                    <Image src="https://picsum.photos/800/400?image=1051" alt="Formal Collection" fill className="object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint="formal suits"/>
                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <h3 className="text-3xl font-bold text-white font-headline">Formal Wear</h3>
                    </div>
                </Link>
                <Link href="/products" className="group relative block w-full h-80 rounded-lg overflow-hidden">
                    <Image src="https://picsum.photos/800/400?image=1071" alt="Casual Collection" fill className="object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint="casual fashion"/>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <h3 className="text-3xl font-bold text-white font-headline">Everyday Essentials</h3>
                    </div>
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
}
