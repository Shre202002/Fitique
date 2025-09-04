
"use client"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { getFeaturedProducts } from '@/lib/data';
import Image from 'next/image';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel"
import { useEffect, useRef, useState } from 'react';
import Autoplay from "embla-carousel-autoplay"


const categories = [
    { name: 'Shirts', image: 'https://picsum.photos/300/300?image=1003', href: '/products' },
    { name: 'T-Shirts', image: 'https://picsum.photos/300/300?image=1011', href: '/products' },
    { name: 'Polos', image: 'https://picsum.photos/300/300?image=1041', href: '/products' },
    { name: 'Trousers', image: 'https://picsum.photos/300/300?image=103', href: '/products' },
    { name: 'Shorts', image: 'https://picsum.photos/300/300?image=1061', href: '/products' },
    { name: 'Jeans', image: 'https://picsum.photos/300/300?image=206', href: '/products' },
];

const features = [
    {
        title: "FOR THE MODERN DOCTOR",
        description: "Stay fresh, clean and comfortable throughout your demanding workdays.",
        image: "https://picsum.photos/800/600?image=431",
        href: "/products",
        dataAiHint: "male doctor"
    },
    {
        title: "FOR THE STARTUP CEO",
        description: "Through the wins, the losses, and everything in between, stay sharp and focused.",
        image: "https://picsum.photos/800/600?image=1005",
        href: "/products",
        dataAiHint: "male executive"
    }
]

const heroSlides = [
    {
        image: "https://picsum.photos/1600/900?image=838",
        alt: "Man in a stylish suit",
        title: "ELEVATE YOUR STYLE",
        description: "Discover our premium collection of formal wear, crafted for the modern individual.",
        dataAiHint: "formal wear"
    },
    {
        image: "https://picsum.photos/1600/900?image=839",
        alt: "Close-up of a tailored shirt",
        title: "UNMATCHED COMFORT",
        description: "Experience the luxury of custom-fit clothing designed just for you.",
        dataAiHint: "tailored shirt"
    },
    {
        image: "https://picsum.photos/1600/900?image=841",
        alt: "A collection of new arrivals",
        title: "NEW ARRIVALS",
        description: "Discover our latest collection of premium shirts and trousers.",
        dataAiHint: "clothing display"
    },
]

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  useEffect(() => {
    if (!api) {
      return
    }
 
    setCurrent(api.selectedScrollSnap())
 
    const onSelect = (api: CarouselApi) => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on("select", onSelect)
 
    return () => {
      api.off("select", onSelect)
    }
  }, [api])


  return (
    <div className="flex flex-col bg-background">
      <section className="relative w-full h-[80vh] md:h-screen text-white -mt-[160px]">
        <Carousel 
            className="w-full h-full overflow-hidden" 
            opts={{ loop: true }}
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            setApi={setApi}
        >
            <CarouselContent className="-ml-0">
                {heroSlides.map((slide, index) => (
                    <CarouselItem key={index} className="pl-0 relative transition-opacity duration-1000" style={{ opacity: index === current ? 1 : 0}}>
                        <div className="relative w-full h-[80vh] md:h-screen">
                             <Image 
                                src={slide.image} 
                                alt={slide.alt} 
                                fill 
                                className="object-cover"
                                data-ai-hint={slide.dataAiHint}
                                priority={index === 0}
                            />
                            <div className="absolute inset-0 bg-black/40" />
                            <div className="relative container mx-auto h-full flex flex-col items-center justify-center text-center px-4 md:px-6 z-10">
                                <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
                                    {slide.title}
                                </h1>
                                <p className="mt-4 text-lg md:text-xl max-w-md">
                                    {slide.description}
                                </p>
                                <Button size="lg" variant="secondary" className="mt-6">
                                    Shop Collection
                                </Button>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
             <div className="absolute bottom-8 right-8 z-10 flex gap-2">
                {heroSlides.map((_, i) => (
                <button
                    key={i}
                    onClick={() => api?.scrollTo(i)}
                    className={`w-2 h-2 rounded-full transition-all ${current === i ? 'p-1.5 bg-white' : 'bg-white/50'}`}
                />
                ))}
            </div>
        </Carousel>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-8">
            {categories.map((category) => (
              <Link href={category.href} key={category.name} className="flex flex-col items-center gap-2 group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={120}
                    height={120}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    data-ai-hint="fashion category"
                  />
                </div>
                <span className="text-sm font-medium text-center">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 my-8">
        <Link href="/products">
            <div className="relative w-full rounded-lg overflow-hidden">
                <Image src="https://picsum.photos/1200/300?image=1025" width={1200} height={300} alt="Ad Banner" className="w-full h-auto" data-ai-hint="clothing banner"/>
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                     <h2 className="text-3xl font-bold text-white font-headline">BODY-MAPPED SHIRTS</h2>
                </div>
            </div>
        </Link>
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter font-headline text-accent">
              Best Sellers
            </h2>
            <Link href="/products">
              <Button size="lg" variant="outline">
                View All
              </Button>
            </Link>
          </div>
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="container mx-auto px-4 md:px-6 my-12">
        <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature) => (
                <Link href={feature.href} key={feature.title} className="group">
                    <div className="relative overflow-hidden rounded-lg">
                        <Image src={feature.image} width={800} height={600} alt={feature.title} className="w-full h-auto object-cover group-hover:scale-105 transition-transform" data-ai-hint={feature.dataAiHint}/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
                        <div className="absolute bottom-0 left-0 p-6 text-white">
                            <h3 className="text-sm font-semibold uppercase tracking-wider">{feature.title}</h3>
                            <p className="text-lg mt-1">{feature.description}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
      </section>

       <section className="py-12 md:py-16 bg-muted/20">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter font-headline text-accent">
              New Arrivals
            </h2>
            <Link href="/products">
              <Button size="lg" variant="outline">
                View All
              </Button>
            </Link>
          </div>
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {featuredProducts.slice(4, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
